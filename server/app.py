# server/app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import groq
import os
from dotenv import load_dotenv
from storage import TechniqueStore

load_dotenv()

app = FastAPI()
technique_store = TechniqueStore()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    message: str
    chat_history: List[dict] = []

@app.post("/api/chat")
async def process_chat(request: QueryRequest):
    try:
        # Search for relevant techniques
        relevant_techniques = technique_store.search(request.message)
        
        # Construct the prompt
        techniques_context = "\n".join([
            f"- {t['name']} ({t['id']}): Used in {', '.join(t['tactics'])}"
            for t in relevant_techniques
        ])
        
        prompt = f"""Based on the following MITRE ATT&CK techniques:
        {techniques_context}
        
        Analyze this query: {request.message}
        
        Provide:
        1. An analysis of relevant attack techniques
        2. Recommended defensive measures
        3. References to specific MITRE technique IDs
        """
        
        # Get response from Groq
        client = groq.Groq(api_key=os.getenv("GROQ_API_KEY"))
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="mixtral-8x7b-32768"
        )
        
        return {
            "response": response.choices[0].message.content,
            "metadata": {
                "techniques": relevant_techniques,
                "query": request.message
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)