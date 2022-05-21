const express = require('express');

const f1test = require('./f1test');    

const app = express();
const port = 3000;

app.use(express.json());


app.route('/')
    .post((req, res) => {
        f1test.createRaces(req);
        res.send("Created Race Events");
    })
    // .put((req, res) => {
    //     res.send("Edited Invites");
    // })
    .delete((req, res) => {
        f1test.deleteRaces(req);
        res.send("Deleted Invites");
    })
    .patch((req, res) => {
        f1test.inviteUpcomingRaces(req);
        res.send("Sent out invites to races");
    })

// app.route('/invite')
//     .post((req, res) => {
//         res.send("Sent Race Invites");
//     })


app.listen(port, () => {
    console.log(`F1 Scheduler listening on port ${port}`)
  })