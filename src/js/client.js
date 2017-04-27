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
    const votesForOpt2 = $(this).next().next().next()[0];
    const votesForOpt1 = $(this).next()[0];
    const opt1percent  = parseInt((data.option1Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    const opt2percent  = parseInt((data.option2Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    $(votesForOpt1).html(`Votes: ${data.option1Vote.length} (${opt1percent}%)`);
    $(votesForOpt2).html(`Votes: ${data.option2Vote.length} (${opt2percent}%)`);
    // console.log(votesForOpt1);
    // console.log(votesForOpt2);
    // console.log(data);
    // console.log(data.option1Vote.length);
  })
  .fail(err => {
    console.log(err);
  });
}
function vote2() {
  const questionId = $(this).attr('data-question-id');
  $.post(`http://localhost:8000/questions/${questionId}/option2`)
  .done(data => {
    const votesForOpt1 = $(this).prev()[0];
    const votesForOpt2 = $(this).next()[0];
    const opt1percent  = parseInt((data.option1Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    const opt2percent  = parseInt((data.option2Vote.length/(data.option2Vote.length+data.option1Vote.length))*100);
    $(votesForOpt1).html(`Votes: ${data.option1Vote.length} (${opt1percent}%)`);
    $(votesForOpt2).html(`Votes: ${data.option2Vote.length} (${opt2percent}%)`);
    // console.log(votesForOpt1);
    // console.log(votesForOpt2);
    // // console.log(data);
    // console.log(data.option2Vote.length);
  })
  .fail(err => {
    console.log(err);
  });
  // console.log(option2Vote);
}
// res.locals.user
