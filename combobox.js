$(document).ready(function(){
    let a= [{text:"Nam",value:0},{text:"Nữ",value:1},{text:"Khác",value:2},]
    let aFilter = [{text:"Nam",value:0},{text:"Nữ",value:1},{text:"Khác",value:2},]
    let selected = 0
    let beforeSelected = 0
    let show = true
    a.forEach(i =>{
        if(i.value === selected){
            $('#table-option').append(`<tr class="tr-selected" style="color: green;" data-optionid="${i.value}">
                                <td>${i.text}</td>
                            </tr>`)
        }
        else
        $('#table-option').append(`<tr style="color: green;" data-optionid="${i.value}">
                                <td>${i.text}</td>
                            </tr>`)
    })
    $("tbody tr").click(function(e){
        selected=$(this).attr("data-optionid")
        $(this).siblings().removeClass('tr-selected');
        $(this).addClass('tr-selected')
        // alert($(this).attr("data-optionid"))
    })
    $("#txtGender").on('input',function(e){
        show=true
        $("#table-option").show()
        if(e.target.value != ""){
            $("#table-option > tbody > tr").each(function(index, tr) { 
                if(!a[index].text.includes(e.target.value))
                $(tr).hide()
                else $(tr).show()
             });
        }else{
            $("#table-option > tbody > tr").each(function(index, tr) { 
                $(tr).show()
             });
        }
        // console.log(e.target.value)
    })
    $("#btn-show").click(function(e){
        if(show === true){
            $("#table-option").hide()
            show = false
        }else{
            $("#table-option").show()
            show = true
        }
    })
    // $(document).click(function(e){
    //     if(show === true){
    //         $("#table-option").addClass('hidden-option')
    //         show = false
    //     }
    // })
    window.addEventListener('click', function(event){
        var box = document.getElementById('table-option');
        var bt = document.getElementById('btn-show');
        if (event.target != box && event.target.parentNode != box && event.target != bt){
            if(show === true){
            $("#table-option").hide()
            show = false
        }
        }
    });
    $(function(){
        $(document).keydown(function(e){
            if(show === true){
                //down
                if(e.which === 40){
                    if(beforeSelected ==(a.length-1)){
                        beforeSelected = 0
                    }else beforeSelected++
                    setTrBeforeSelectedStyle(beforeSelected,selected)
                    $("#txtGender").val(a[beforeSelected].text)
                }
                //up
                if(e.which === 38){
                    if(beforeSelected == 0){
                        beforeSelected = a.length-1
                    }else beforeSelected--
                    setTrBeforeSelectedStyle(beforeSelected,selected)
                    $("#txtGender").val(a[beforeSelected].text)
                }
                if(e.which === 13){
                    selected = beforeSelected
                    setTrSelectedStyle(selected)
                    $("#table-option").hide()
                    $("#txtGender").val(a[selected].text)
                }
            }
        });
    });
    $(function(){
        $("#table-option > tbody > tr").mouseover(function(){
            // console.log($(this).attr("data-optionid"))
            $("#txtGender").val(a[$(this).attr("data-optionid")].text)
            $(this).siblings().removeClass('tr-before-selected');
        })
    })

    jQuery.fn.extend({
        getData: function() {
        var tb = $("#table-option").attr("id");
        if(tb == this.attr("id")) return a
        },
        getValue: function() {
            var tb = $("#table-option").attr("id");
            if(tb == this.attr("id")){
                return a[selected].value
            }
        },
        getText : function(){
            var tb = $("#table-option").attr("id");
            if(tb == this.attr("id")){
                return a[selected].text
            }
        }
      });
    
})

function setTrBeforeSelectedStyle(beforeSelected,selected){
   
    $("#table-option > tbody > tr").each(function(index, tr) { 
        if($(tr).attr("data-optionid") == beforeSelected){
            $(tr).siblings().removeClass('tr-before-selected');
            if(beforeSelected!=selected)
            $(tr).addClass('tr-before-selected')
        }
     });
}

function setTrSelectedStyle(num){
    $("#table-option > tbody > tr").each(function(index, tr) { 
        if($(tr).attr("data-optionid") == num){
            $(tr).siblings().removeClass('tr-before-selected');
            $(tr).siblings().removeClass('tr-selected');
            $(tr).removeClass('tr-before-selected')
            $(tr).addClass('tr-selected')
        }
     });
}