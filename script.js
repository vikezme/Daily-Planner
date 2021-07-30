var calendarEntries = {};

$( document ).ready(function() {
    console.log( "ready!" );
    var containerHTML = "";
    $('#currentDay').html(moment().format("dddd, MMMM Do YYYY"));
    for(var i=9;i<=17;++i) {
      formattedTime = moment().hour(i).format("hA");
      containerHTML += `        <div id="${i}" class="entry">
                <div>${formattedTime}</div>
                <input type="text"/>
                <button type="button" class="saveBtn">Save</button>
              </div>
`;
    }
    $(".container").html(containerHTML);

    var savedCalendarEntries = window.localStorage.getItem('calendarEntries');
    if(savedCalendarEntries) {
      calendarEntries = JSON.parse(savedCalendarEntries);
      for (const [entryTime, entryText] of Object.entries(calendarEntries)) {
        console.log($(`.${entryTime}`));
        var element = $(`#${entryTime} input`);
        if(element.length) {
          element[0].value = entryText;
        }
      }
    }
    $("button").click(function(event){
      console.log( event );
      var entryText = $(event.currentTarget).parent().find("input")[0].value;
      var entryTime = $(event.currentTarget).parent()[0].id;
      calendarEntries[entryTime] = entryText;
      window.localStorage.setItem('calendarEntries', JSON.stringify(calendarEntries));
      });
});

$(document).ready(function(){
    $(".saveBtn").click(function(){
        $(".entry").attr("style","background-color:red");
    });
});
