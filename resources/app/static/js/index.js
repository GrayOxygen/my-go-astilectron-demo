let index = {
    init: function() {
        // Init
        asticode.loader.init();
        asticode.modaler.init();
        asticode.notifier.init();

        // Wait for astilectron to be ready
        document.addEventListener('astilectron-ready', function() {

            document.getElementById("jsonData").onblur =  index.jsonChange ;
             // Listen
            index.listen();
            // Explore default path
            // index.explore();
        })
    },
    jsonChange:function(){
        let temp=document.getElementById("jsonData").value
        if (temp){
            astilectron.sendMessage({name: "jsonToStruct", payload: temp   }, function(message) {

                // Check error
                if (message){
                    if ( message.name === "error") {
                        document.getElementById("structData").value = "";
                        document.getElementById("nestStructData").value = "";
                        asticode.notifier.error(message.payload.error.message);
                        message.payload=""
                        return
                    }
                    document.getElementById("structData").value = message.payload.structData;
                    document.getElementById("nestStructData").value = message.payload.nestStructData;
                    message.payload=""
                    return
                }
                document.getElementById("structData").value = "";
                document.getElementById("nestStructData").value = "";
            });

        }
    },
    about: function(html) {
        let c = document.createElement("div");
        c.innerHTML = html;
        asticode.modaler.setContent(c);
        asticode.modaler.show();
    },
    addFolder(name, path) {
        let div = document.createElement("div");
        div.className = "dir";
        div.onclick = function() { index.explore(path) };
        div.innerHTML = `<i class="fa fa-folder"></i><span>` + name + `</span>`;
        document.getElementById("dirs").appendChild(div)
    },

    listen: function() {
        astilectron.onMessage(function(message) {
            switch (message.name) {
                case "about":
                    index.about(message.payload);
                    return {payload: "payload"};
                    break;
                // case "check.out.menu":
                //     asticode.notifier.info(message.payload);
                //     break;
            }
        });
    }
};