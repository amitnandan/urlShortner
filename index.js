const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./router/url");
const URL = require("./model/url");
const path = require('path');
const app = express();
const PORT = 8001;

const staticRoute = require("./router/staticRouter")


connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);
//telling that i am using a view engine
app.set("view engine" ,"ejs");
app.set('views', path.resolve('./view') );

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/test' , async(req,res)=>{

  const allUrls = await URL.find({});
  return res.render('home',{
    urls:allUrls,
  });
}
  )


app.use('/url',urlRoute);




app.use('/',staticRoute);








app.get("url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      // Handle the case where no entry was found for the given shortId
      res.status(404).send("URL not found");
      return;
    }
  
    // Check if the entry has a redirectURL
    if (entry.redirectURL) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(500).send("Redirect URL not found in the entry");
    }
  });
  


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));