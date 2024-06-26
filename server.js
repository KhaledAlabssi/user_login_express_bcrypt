import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    
    const hashedPassowrd = await bcrypt.hash(req.body.password, 10);
    
    console.log(hashedPassowrd);
    const user = {
      name: req.body.name,
      password: hashedPassowrd
    };

    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user === null) {
        return res.status(400).send("Could find user!")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success!")
        } else {
            res.send("Not allowed!")
        }
        
    }
    catch {
        res.status(500).send();

    }
})

app.listen(3000);
