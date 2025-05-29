const { defineConfig } = require("cypress");
const MailosaurClient = require("mailosaur");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        pretendLogin: async({email, password}) => {
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email, password
            })
          }

          const response = await fetch("http://localhost:8080/api/v1/auth/login", options).then(r => r.json()).catch(e => console.log(e))
          return response
        },

        pretendTFA: async({email, code}) => {
          const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email, code
            })
          }

          const response = await fetch("http://localhost:8080/api/v1/auth/validate-tfa", options).then(r => r.json()).catch(e => console.log(e))
          return response
        },

        getLastMail: async(serverId, sentTo) =>{
          const options = {
              method: 'GET',
              headers: {Authorization: 'Basic MUhKcFJWdlJPQlBqR2UwZ2J0OWpjYmhhS050MTlWQm06'}
            };
            
          const messages = await fetch(`https://mailosaur.com/api/messages?server=${serverId}&sentTo=${sentTo}`, options)
              .then(response => response.json())
              .catch(err => console.error(err));

          const last = messages.items.sort((a, b) => new Date(b.received).getTime() - new Date(a.received).getTime())[0]?.id;
          console.log(last)

          const messageData = await fetch(`https://mailosaur.com/api/messages/${last}`, options).then(res => res.json()).catch(err => console.log(err))
          //console.dir(messageData, { depth: null })
          const code = messageData.html.codes[0].value
          return code
        }
      })
    },
  },
});
