console.log('hello world');
$(init);
//
// let option1Vote = 0
// let option2Vote = 0
//
function init() {
  // console.log($('.option1'));
  $('.option1').on('click', vote1);
  $('.option2').on('click', vote2);
  $('.button-collapse').sideNav();
}
// //
function vote1() {
  const questionId = $(this).attr('data-question-id');
  $.post(`http://localhost:8000/questions/${questionId}/option1`)
  .done(data => {
    console.log(data);
  })
  .fail(err => {
    console.log(err);
  });
  // $('.opt1').html(-1);
}
function vote2() {
  const questionId = $(this).attr('data-question-id');
  $.post(`http://localhost:8000/questions/${questionId}/option2`);

  // find question by id
}
// res.locals.user
