## How to Run the Project

```bash
npm i 
npm run dev
```

## Testing

To run tests:
```bash
npm test
```

To ingest test documents:
```bash
npm run seed
```

## Available Endpoints

### Health Check
- **GET** `/health`

### Document Ingestion
- **POST** `/ingest`
- **Body example:**
```json
[
  {
    "id": "doc1",
    "text": "Armenia is a mountainous country...",
    "metadata": {
      "source": "wiki"
    }
  }
]
```

### Query Documents
- **POST** `/ask`
- **Body example:**
```json
{
  "query": "What is Armenia known for?",
  "topK": 5,
  "maxTokens": 200
}
```

## Future Improvements

Using embedding models directly in our server might be problematic since all Hugging Face packages are in ESM modules, which creates dynamic import problems. 

**Potential solutions:**
- Transfer the whole project to ESM modules
- Create a separate local service (e.g., in Python) to handle embeddings