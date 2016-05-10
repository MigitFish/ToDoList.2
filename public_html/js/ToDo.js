
    $(function () {
        var APPLICATION_ID = "B37DC2D5-F6F7-8B66-FFFE-69AC8EDBB100",
            SECRET_KEY = "EB4FCE4C-9768-C529-FF97-293703F0FE00",
            VERSION = "v1";

            Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
            
            var dataQuery = {
                condition: "ownerId = '" + Backendless.LocalCache.get("current-user-id") + "'"
            };
            var postsCollection = Backendless.Persistence.of(Posts).find(dataQuery);
            
        console.log(postsCollection);
        
        var wrapper = {
                posts: postsCollection.data
            };
            
            Handlebars.registerHelper("format", function (time) {
                return moment(time).format("dddd, MMMM Do YYYY");
            });
            
            var blogScript = $("#blogs-template").html();
            var blogTemplate = Handlebars.compile(blogScript);
            var blogHTML = blogTemplate(wrapper);
            
            $(".main-container").html(blogHTML);
    });
    
    function Posts(args) {
        args = args || {};
        this.title = args.title || "";
        this.content = args.content || "";
        this.authorEmail = args.authorEmail || "";
    }
    $(document).on('click','.trash', function (event){
       Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
       location.reload();
    });
    $(document).on('click','.done', function (event){
    var complete = Backendless.Persistence.of(Posts).findById(event.target.attributes.data.nodeValue);
    complete["Done"] = true;
    var completeTasks = Backendless.Persistence.of(Posts);
    completeTasks.save(complete);
    location.reload();
    });
