console.log('hello world');
$(init);
//
// let option2Vote = 0
function init() {
  // console.log($('.option1'));
  $('.option1').on('click', vote1);
  $('.option2').on('click', vote2);
  $('.button-collapse').sideNav();
  $('button').hover(hoverOn, hoverOff);


// -----------------//   randomBackground();
}
// // //
// function randomBackground() {
//   // const randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
//   $('.question').forEach(() => {
//     $('.question').css('background-color', 'red');
// ------------------//   });
// }

function hoverOn() {
  $(this).addClass('pulse');
}
function hoverOff() {
  $(this).removeClass('pulse');

}
function vote1() {
  const questionId = $(this).attr('data-question-id');
  $.post(`http://localhost:8000/questions/${questionId}/option1`)
  .done(data => {
    const parentDiv = $(this).parent().parent().find('li.opt2')[0];
    const votesForOpt1 = $(this).next()[0];
    const opt1percent  = parseInt((data.option1Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    const opt2percent  = parseInt((data.option2Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    
    $(votesForOpt1).html(`Votes: ${data.option1Vote.length} (${opt1percent}%)`);
    $(parentDiv).html(`Votes: ${data.option2Vote.length} (${opt2percent}%)`);
    // ---------------------------------------------------------
    // if (data.option1Vote.length>data.option2Vote.length) {
    //   $(this).parent().parent().removeClass('backBlue');
    //   $(this).parent().parent().addClass('backRed');
    // } else if (data.option1Vote.length<data.option2Vote.length) {
    //   $(this).parent().parent().removeClass('backRed');
    //   $(this).parent().parent().addClass('backBlue');
    // }
// ==============================================================
  })
  .fail(err => {
    console.log(err);
  });
}
function vote2() {
  const questionId = $(this).attr('data-question-id');
  $.post(`http://localhost:8000/questions/${questionId}/option2`)
  .done(data => {
    const parentDiv = $(this).parent().parent().find('li.opt1')[0];
    const votesForOpt2 = $(this).next()[0];
    const opt1percent  = parseInt((data.option1Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    const opt2percent  = parseInt((data.option2Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);

    $(parentDiv).html(`Votes: ${data.option1Vote.length} (${opt1percent}%)`);
    $(votesForOpt2).html(`Votes: ${data.option2Vote.length} (${opt2percent}%)`);
// ----------------------------------------------------------------------------------------------
    // const votes1 = $(this).parent().parent().find('li.opt1')[0].textContent.substring(7, 9);
    // const votes2 = $(this).parent().parent().find('li.opt2')[0].textContent.substring(7, 9);
    // console.log(votes1);
    // console.log(votes2);
    // console.log((parentDiv.textContent.substring(7, 9)));
    // if (data.option1Vote.length>data.option2Vote.length) {
    //   $(this).parent().parent().removeClass('backBlue');
    //   $(this).parent().parent().addClass('backRed');
    // } else if (data.option1Vote.length<data.option2Vote.length) {
    //   $(this).parent().parent().addClass('backBlue');
    //   $(this).parent().parent().removeClass('backRed');
    // }
// -------------------------------------------------------------------------------------------
  })
  .fail(err => {
    console.log(err);
  });
  // console.log(option2Vote);
}
// res.locals.user
