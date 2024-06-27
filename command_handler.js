const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 9080;

app.use(express.json());

// Simula un token fisso
const authToken = 'antonio1977';

app.get('/exec', (req, res) => {
    const encodedCommand = req.query.command || '';
    const command = decodeURIComponent(encodedCommand);

    const token = req.query.token;

    if (token !== authToken) {
        return res.status(401).json({ error: 'Token non valido' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message, stderr: stderr });
        }
        res.json({ stdout: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
