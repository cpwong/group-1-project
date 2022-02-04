1. Copy data_backup.json to data.json
```
cp data_back.json data.json
```

2. Start JSON server command
```
npx json-server --port 3300 --watch data.json
```