
function toggleactive(new_active_tab){
    $('.nav > li > a').removeClass('active');
    $(`#tab-${new_active_tab} > a`).addClass('active');

    $('.contents').hide();
    $(`#container-${new_active_tab}`).show();






  /*  {
        $('.nav > li > a').removeClass('active');
        $(`#tab-${new_active_tab} > a`).addClass('active');
        $('.contents').hide();
        $(`#container-${new_active_tab}`).show();
    }*/
}

$(function(){
    $('#tab-add').click(function(){
        toggleactive('add');   
    })

    $('#tab-view').click(function(){
        toggleactive('view');
    })

    $('#tab-delete').click(function(){
        toggleactive('delete');
    })

    $('#tab-modify').click(function(){
        toggleactive('deleted');
    })
})