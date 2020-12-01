// 查

$('.list').print()

$('.list').each((ele,index)=>{
  console.log(ele,index)
})

$('.container1').find('#one')
$('.container1').find('.list')
$('.container2').find('.list')

document.querySelectorAll('.list','.container2')

$('.container2').find('.list').end()

function alertContent(e) {
  alert($(this).text())
  $(this).off('click',alertContent)
}

$('.list').on('click',alertContent)