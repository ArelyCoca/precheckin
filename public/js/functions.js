var currentTab = parseInt(0); 
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    if(n > 0){
        var nameHotel = $('input[name="hotelName"]').val()
        $('.nav').removeClass('nav_home').addClass('nav_intern')
        $('.nav--hotel').addClass('show')
        document.getElementById('titleHotel').innerHTML = nameHotel;
    }
    x[n].style.display = "block";
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
    if(currentTab != 2){
        if (n == 1 && !validateForm()) return false;
    }
    if(currentTab == 3){
        fillFields()
    }
    if(currentTab == 4){
        addRows()
    }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + parseInt(n);
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  return valid; // return the valid status
}

// BOTON NEXT
$('.nextBtn').each(function (e) {
    $(this).on('click', function (e) {
        e.preventDefault();
        var tab = $(this).attr('data-tab');
        nextPrev(tab)
    })
})

// CONDICIONES DE USO
$('#condiciones-de-uso , .condiciones-de-uso').each(function (index, el) {
    $(this).on('change', function (e) {
      var $this = $(this);
      var target = $(this).parents('.block--info').siblings('.step--buttons').find('button.submit')
      console.log(target)
      if ($(this).is(':checked')) {
        target.prop('disabled', false);
      } else {
        target.prop('disabled', true);
      }
    });
  });

// LLENAR DATOS
function fillFields(){
    var name = $('.guest-img').find('input[name="name"]').val()
    var lastname = $('.guest-img').find('input[name="last-name"]').val()
    $('.guest-data').find('input[name="name"]').val(name)
    $('.guest-data').find('input[name="last-name"]').val(lastname)
}
// ADDROWS
function addRows(){
    var name = $('.guest-data').find('input[name="name"]').val()
    var lastname = $('.guest-data').find('input[name="last-name"]').val()
    var long = document.getElementById('table-file').childElementCount
    var row = document.getElementById('table-file').insertRow(long + 1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    cell1.innerHTML = name;
    cell2.innerHTML = lastname;
    cell3.innerHTML = '<td class="center"><a" class="btn btn--circle btn--circle-blue btn--circle-pin" data-tab="1"></a></td>';
    cell4.innerHTML = '<td class="center"><input type="checkbox"></td>';
    cell3.className = 'center'
    cell4.className = 'center'
}
// PASA NOMBRE DE HOTEL Y HEADER
$('.step--list-hotels--item').each(function () {
    $(this).on('click', function () {
        var hotelName = $(this).attr('data-hotel');
        $('input[name="hotelName"]').val(hotelName);
        document.getElementById('valuehotelName').innerHTML = hotelName;
    })
})

// MODAL
var modal = document.getElementsByClassName("modal")[0];
var close = document.getElementsByClassName("close")[0];
var upload = document.getElementsByClassName("load-image--container")[0]

upload.onclick = function() {
    modal.style.display = "block"
}
close.onclick = function() {    
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// LOAD IMAGE
$('.upload').on('click', function (e) {
    // console.log("UPLOAD")
    // e.preventDefault();
    document.getElementById('fileUpload').click();
});
window.addEventListener('load', function() {
    document.querySelector('#fileUpload').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#myImg');  // $('img')[0]
            var img2 = document.querySelector('#myImg2'); 
            var img3 = document.querySelector('#myImg3'); 
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img2.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img3.src = URL.createObjectURL(this.files[0]); // set src to blob url

            img2.style.display = "block"
            img3.style.display = "block"
            var tx = document.querySelector('.load-image--container .tx');
            tx.style.display = 'none'
        }
    });
});

//SUBMENUS
$(document).on('click', '.has-submenu', function (event) {
  event.stopPropagation()
  console.log('click :)')
  /* Act on the event */
  // event.stopPropagation()
  if ($(this).hasClass('open')) { // cerrar
    $(this).removeClass('open').addClass('close')
  } else { // abrir
    // valida, si los otros submenus estan abiertos, los cierra
    $(this).parent().parent().find('.has-submenu').each(function (index, el) {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open')
        $(this).find('.navbar_submenu').slideUp('slow')
      }
    })
    // agrega clase de abierto al submenu que le dio click
    $(this).addClass('open').removeClass('close')
  }
  $(this).find('.navbar_submenu').slideToggle('slow')
})
// $(document).on('mouseenter', '.nav .has-submenu', function (event) {
//   /* Act on the event */
//   event.stopPropagation()
//   if ($(this).hasClass('open')) { // cerrar
//     $(this).removeClass('open').addClass('close')
//   } else { // abrir
//     // valida, si los otros submenus estan abiertos, los cierra
//     $(this).parent().parent().find('.has-submenu').each(function (index, el) {
//       if ($(this).hasClass('open')) {
//         $(this).removeClass('open')
//         $(this).find('.navbar_submenu').slideUp('slow')
//       }
//     })
//     // agrega clase de abierto al submenu que le dio click
//     $(this).addClass('open').removeClass('close')
//   }
//   $(this).find('.navbar_submenu').stop().slideDown('slow', () => {
//     if (window.innerHeight < 500) {
//       console.log('hola')
//       $(this).find('.navbar_submenu').css({ 'overflow': 'scroll', 'height': '400px!important' })
//     }
//   })
// }).on('mouseleave', '.nav .has-submenu', function () {
//   $(this).parent().parent().find('.has-submenu').each(function (index, el) {
//     if ($(this).hasClass('open')) {
//       $(this).removeClass('open')
//       $(this).find('.navbar_submenu').stop().slideUp('slow')
//     }
//   })
// })
