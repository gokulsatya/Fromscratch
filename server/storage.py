# server/storage.py
from typing import Dict, List
import json
from pathlib import Path

class TechniqueStore:
    def __init__(self):
        self.techniques: Dict = {}
        self.load_techniques()
    
    def load_techniques(self):
        """Load a subset of MITRE ATT&CK techniques for our prototype"""
        initial_techniques = {
            "T1566": {
                "name": "Phishing",
                "description": "Adversaries may send phishing messages to gain access to victim systems.",
                "tactics": ["Initial Access"],
                "references": ["https://attack.mitre.org/techniques/T1566/"]
            },
            "T1110": {
                "name": "Brute Force",
                "description": "Adversaries may attempt to gain access to accounts by conducting brute force attacks.",
                "tactics": ["Credential Access"],
                "references": ["https://attack.mitre.org/techniques/T1110/"]
            }
            # Add more initial techniques as needed
        }
        self.techniques = initial_techniques
    
    def search(self, query: str) -> List[Dict]:
        """Simple search implementation"""
        results = []
        query_terms = query.lower().split()
        
        for tid, tech in self.techniques.items():
            score = 0
            text = f"{tech['name']} {tech['description']}".lower()
            
            for term in query_terms:
                if term in text:
                    score += 1
            
            if score > 0:
                results.append({
                    "id": tid,
                    "name": tech["name"],
                    "tactics": tech["tactics"],
                    "score": score / len(query_terms)
                })
        
        return sorted(results, key=lambda x: x["score"], reverse=True)[:5]