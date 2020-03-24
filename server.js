require("dotenv").config();
const express = require("express");
const Discord = require("discord.js");
const axios = require("axios").default;

const app = express();
const discordClient = new Discord.Client();

const BOT_API_KEY = process.env.BOT_API_KEY;

const HOST = process.env.HOST;
const API_KEY = process.env.API_KEY;

/**
 * DISCORD STUFF
 */

discordClient.once("ready", () => console.log("BOT IS WORKING!"));
discordClient.on("message", message => {
  if (!message.content.startsWith("!g")) {
    // Ignoralo :v
  } else {
    if (message.content.includes("champions")) {
      axios.get("http://localhost:3000/champions").then(response => {
        message.reply(
          `Los ID's de campeones gratuitos de esta semana son: ${response.data.freeChampionIds}`
        );
      });
    }
    // le esta hablando al bot, hagamos cosas
  }
});

/**
 * EXPRESS STUFF
 */

app.get("/", (req, res) => {
  res.send("Jelou uor :v");
});

app.get("/champions", (req, res) => {
  axios
    .get(`${HOST}/lol/platform/v3/champion-rotations`, {
      headers: { "X-Riot-Token": API_KEY }
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.json(error);
    });
});

discordClient.login(BOT_API_KEY);
app.listen(3000, () => console.log(`Server running on port 3000`));
