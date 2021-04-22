$(document).ready(function(){
   
    document.addEventListener("DOMContentLoaded" , getItems())
    
    $("#Add").click(function(e){
            
            e.preventDefault();
            var input = $("#doWork").val();
            var Dates = $("#doDate").val();
            var Time = $("#doTime").val();

            var CurrentObject= new Date(CurrentDate());
            var CurrentTimeObject = CurrentObject.getTime();
            var EndObject = new Date(Dates);
            var EndTimeObject = EndObject.getTime();
            
            
            if (Dates == "" || input =="" || Time =="" ){
                $("h3").addClass("Error").animate({left:"25%" }, 100)
                $("h3").text("Please Fill all the inputs")
            }else{
                if($("h3").hasClass("Error") && CurrentTimeObject < EndTimeObject ){
                    $("h3").animate({left:"1000%"},500 , function(){
                        $("h3").text("");
                        $("h3").removeClass("Error")

                    })
                   
                }
                
                if (CurrentTimeObject > EndTimeObject){
                    $("h3").addClass("Error").animate({left:"25%" }, 100)
                    $("h3").text("Your time Rewoked")
                }
                else{
                    if($("h3").hasClass("Error") && (Dates == "" || input =="" || Time =="" ) ){
                        $("h3").animate({left:"1000%"},500 , function(){
                            $("h3").text("");
                            $("h3").removeClass("Error")
    
                        })
                       
                    }
                    
                    var doList = $("<td class='tableItems'>" + $("#doWork").val()+"</td>");
                    var doFor = $("<td class='tableItems'>" + "for " + $("#doDate").val() + " at " + $("#doTime").val() +"</td>");
                    var doTime = $("<td class='tableItems'>" + "Created in " + CurrentDate() + " at " + CurrentTime() + "</td>");
                    var operation = $("<td ><button class='btn check-btn'><i class = 'fa fa-check'></i></button><button class='btn trash-btn' ><i class = 'fa fa-trash'></i></button></td>")
                    var row = $("<tr id='s'></tr>");
                    addToLocalStorage(input , Dates , Time)
                    
                    row.append(doList,doFor,doTime,operation);
                    
                    $("#tBody").append(row);
                    $("#doWork").val("");
                    $("#doDate").val("");
                    $("#doTime").val("");
                    

                }
                
            } 
           
       

      
       

        

        
    })
    $("table").click(function(e){
        const clickedItem = e.target;
        if (clickedItem.classList[1] === "trash-btn" ){
            const row = clickedItem.parentElement.parentElement;
            removeLocalStorage(row)
            row.remove()
            
            
        }
        if (clickedItem.classList[1] === "check-btn" ){
            const row = clickedItem.parentElement.parentElement;
            row.classList.toggle("completed");
        }

    })
    $(".filter-task").change(function(e){
       
       if(document.querySelector("#s") != null){
            const filterTodo = document.querySelector("#s").parentElement.childNodes
            
            filterTodo.forEach(function(todo){
                
                
                switch(e.target.value){
                    case "all":
                        if(todo.nodeType != 3){
                        
                            if(todo.classList.contains("hide")){
                                todo.classList.remove("hide")
                            }
                                
                        }
                        break;
                    case "completed":
                        
                        if(todo.nodeType != 3){
                            console.log(todo)
                            if(todo.classList.contains("completed")){
                                todo.classList.remove("hide")
                            }else{
                                todo.classList.add("hide")
                            }
                        }
                        
                    
                    break;
                    
                    case "uncompleted":
                        if(todo.nodeType != 3){
                            console.log(todo)
                            if(todo.classList.contains("completed")){
                                todo.classList.add("hide")
                            }else{
                                todo.classList.remove("hide")
                            }
                        }

                }
            
        
            })
        }
     
    })



    function CurrentDate(){
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '/' + dd + '/' + yyyy;
        
        return today;
    }
    function CurrentTime(){
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        return time;
    }
    function addToLocalStorage(Text , date , Time){
        let Texts ;
        let Dates ;
        let Times ;
        if(localStorage.getItem("Texts")===null && localStorage.getItem("Dates")===null && localStorage.getItem("Times")===null){
            Texts =[];
            Dates =[];
            Times =[];
        }else{
            Texts = JSON.parse(localStorage.getItem("Texts"));
            Dates = JSON.parse(localStorage.getItem("Dates"));
            Times = JSON.parse(localStorage.getItem("Times"));
        }
        Texts.push(Text);
        Dates.push(date);
        Times.push(Time);
        localStorage.setItem("Texts" , JSON.stringify(Texts));
        localStorage.setItem("Dates" , JSON.stringify(Dates));
        localStorage.setItem("Times" , JSON.stringify(Times));
    }

    function getItems(){
        let Texts ;
        let Dates ;
        let Times ;
        if(localStorage.getItem("Texts")===null && localStorage.getItem("Dates")===null && localStorage.getItem("Times")===null){
            Texts =[];
            Dates =[];
            Times =[];
        }else{
            Texts = JSON.parse(localStorage.getItem("Texts"));
            Dates = JSON.parse(localStorage.getItem("Dates"));
            Times = JSON.parse(localStorage.getItem("Times"));
        }
        var length = Texts.length;
        var i = 0;
        
        // to get our data from local storage

        while(i<length){
            var doList = $("<td class='tableItems'>" + Texts[i] + "</td>");
            var doFor = $("<td class='tableItems'>" + "for " + Dates[i] + " at " + Times[i] +"</td>");
            var doTime = $("<td class='tableItems'>" + "Created in " + CurrentDate() + " at " + CurrentTime() + "</td>");
            var operation = $("<td ><button class='btn check-btn'><i class = 'fa fa-check'></i></button><button class='btn trash-btn' ><i class = 'fa fa-trash'></i></button></td>")
            var row = $("<tr id='s'></tr>");
            
            
            row.append(doList,doFor,doTime,operation);
            
            $("#tBody").append(row);
            i++;

        }

       
    }

    function removeLocalStorage(e){
        let Texts ;
        let Dates ;
        let Times ;
        if(localStorage.getItem("Texts")===null && localStorage.getItem("Dates")===null && localStorage.getItem("Times")===null){
            Texts =[];
            Dates =[];
            Times =[];
        }else{
            Texts = JSON.parse(localStorage.getItem("Texts"));
            Dates = JSON.parse(localStorage.getItem("Dates"));
            Times = JSON.parse(localStorage.getItem("Times"));
        }
        // to get the index of our desire tr that we want to remove
        // the index are same for other arrays

        const itemIndex = e.children[0].innerText;
        Texts.splice(Texts.indexOf(itemIndex) , 1)
        Dates.splice(Dates.indexOf(itemIndex) , 1)
        Times.splice(Times.indexOf(itemIndex) , 1)
        localStorage.setItem("Texts" , JSON.stringify(Texts))
        localStorage.setItem("Dates" , JSON.stringify(Dates))
        localStorage.setItem("Times" , JSON.stringify(Times))

    }
    
})