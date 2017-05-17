$(function() {
    var pressed = false;
    var start = undefined;
    var startX, startWidth;

    $("table th").mousedown(function(e) {
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
    });

    $(document).mousemove(function(e) {
        if (pressed) {
            $(start).width(startWidth + (e.pageX - startX));
        }
    });

    $(document).mouseup(function() {
        if (pressed) {
            $(start).removeClass("resizing");
            pressed = false;
        }
    });
});
$(document).ready(function() {
    NavigationChange();
    $('.loading').addClass('hide');
    otable = $("#clientable").dataTable({
        "aaSorting": [],
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 6] } ],
        destroy: true
    });
    quetable = $("#questiontable").dataTable({
        'aLengthMenu': [
            [5, 20, 50, 100, -1],
            ["5", "20", "50", "100", "all"]
        ],
        'iDisplayLength': 5,
        'order': [],
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 4 ] } ],
        destroy: true
    });

    otable2 = $("#AllReviewTable").dataTable({
        'aLengthMenu': [
            [8, 20, 50, 100, -1],
            ["10", "20", "50", "100", "all"]
        ],
        'iDisplayLength': 8,
        'order': [],
           
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 5 ] } ],
        columnDefs: [
                        { "width": "40px", "targets": 0 },
                        { "width": "70px", "targets": 1 },
                        { "width": "65px", "targets": 2 },
                        { "width": "50px", "targets": 3 },
                        { "width": "60px", "targets": 4 },
                        { "width": "50px", "targets": 5 }
        ],
        destroy: true,
    });

});
$("#searchEmail1,#searchPhone1,#searchName1").bind("keyup", CalculateTotalOnKeyUpEvent1);
function CalculateTotalOnKeyUpEvent1(e) {
        if (e.keyCode == 13) {
            filterMyReview(1);
        }
    }
function getUserInfo(id,showNav) {
        $.ajax({
            url: '/submitUserId',
            method: 'POST',
            data: {
                'id': id,
                'backLocation': window.location.href,
                'showNav':'searchReview'
            },
            success: function(data) {
                //window.location.href = 'admin/view';
                //window.open('admin/view');
                //window.open("admin/view", "", "width=950,height=600");
                popitup("admin/view");
            },
            dataType: 'JSON',
        });
    }
function popitup(o){return newwindow=window.open(o,"name","height=550,width=1220,left=100,top=80,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=no"),window.focus&&newwindow.focus(),!1}
function changeStatus(rowid, clientid, flag) {
    if (flag == 1)
        var str = "Are you sure You want to block client access ? ";
    if (flag == 0)
        var str = "Are you sure You want to give  access to client ? ";

    if (confirm(str) == true)
        $.ajax({
            url: '/changeClientStatus',
            method: 'POST',
            data: {
                'clientid': clientid,
                'flag': flag
            },
            success: function(data) {
                if (flag == 1) {
                    document.getElementById("clientable").rows[rowid].cells.item(5).innerHTML = "Access Blocked";
                    document.getElementById("clientable").rows[rowid].cells.item(6).innerHTML = '<a href="#viewUploadedFiles" rel="modal:open"> <span class="fa fa-eye" onclick=getUploadeFiles(' + clientid + ') title="click to view Files" style="margin-left:10%"></span> </a><span class="fa fa-ban" style="color:red;margin-left:8%" title="Click to Approve" onclick=changeStatus("' + rowid + '",' + clientid + ',0)></span>';
                } else {
                    document.getElementById("clientable").rows[rowid].cells.item(5).innerHTML = "Active";
                    document.getElementById("clientable").rows[rowid].cells.item(6).innerHTML = '<a href="#viewUploadedFiles" rel="modal:open"> <span class="fa fa-eye" onclick=getUploadeFiles(' + clientid + ') title="click to view Files" style="margin-left:10%"></span> </a><span class="fa fa-check-circle-o" style="color:green;margin-left:8%" title="Click to Block" onclick=changeStatus("' + rowid + '",' + clientid + ',1)></span>';
                }
            }
        });
}

function hideShowleftColumn(id1, id2) {
    if (id1 == 'clienttabledivId') {
        $("#label2").removeClass("backgrnd");
        $("#label1").addClass("backgrnd");
    } else {
        $("#label1").removeClass("backgrnd");
        $("#label2").addClass("backgrnd");
    }
    if ($("#" + id2).hasClass("hide") == false) {
        $("#" + id2).addClass("hide");

    }
    if ($("#" + id1).hasClass("hide")) {
        $("#" + id1).removeClass("hide");

    }
}

function addQuestion() {
    var quesdesc1 = $("#questDescriptionAdd").val();
    var type1 = parseInt($("#selectTypeForAdd").val());
    var Mandatory1 = parseInt($("#selectMandatoryForadd").val());
    var quesOrder1 = parseInt($("#quesOrderAdd").val());
    if (quesOrder1 == "") {
        quesOrder1 = 1;
    }
    if (quesdesc1.trim().length == 0) {
        alert("please provide input");
        return false;
    } else if (quesOrder1 == "") {
        alert("please enter question order");
    } else {
        $('.loading').removeClass('hide');
        $.ajax({
            url: '/addEditQuestionByAdmin',
            method: 'POST',
            data: {
                'quesdesc': quesdesc1,
                'type': type1,
                'Mandatory': Mandatory1,
                'order': quesOrder1,
                'rowid': 0
            },
            success: function(data) {
                $('.loading').addClass('hide');
                if (data[0][0].questionId === -1) {

                } else {
                    var textarea = '<textarea  maxlength="500" class="form-control textareaCss">' + quesdesc1 + '</textarea>';
                    if (type1 === 1) {
                        var type = '<select id="selectTypeForAdd"class="form-control"><option value="1" selected>Yes/No</option><option value="2">Rating</option><option value="3">Thumbs up</option></select>';
                    } else if (type1 === 2) {
                        var type = '<select id="selectTypeForAdd"class="form-control"><option value="1" >Yes/No</option><option value="2" selected>Rating</option><option value="3">Thumbs up</option></select>';
                    } else if (type1 === 3) {
                        var type = '<select id="selectTypeForAdd"class="form-control"><option value="1" >Yes/No</option><option value="2" >Rating</option><option value="3" selected>Thumbs up</option></select>';
                    }
                    if (Mandatory1 === 1) {
                        var Mandatory = '<select id="selectMandatoryForadd"class="form-control" name="" ><option value="1" selected>Yes</option><option value="0">No</option></select>';
                    } else {
                        var Mandatory = '<select id="selectMandatoryForadd"class="form-control" name="" ><option value="1" >Yes</option><option value="0"selected>No</option></select>';
                    }
                    var order = '<input type="text" id="quesOrderAdd" maxlength="2" class="form-control" value="' + quesOrder1 + '"/>';
                    var save = '<span class="glyphicon glyphicon-floppy-disk"  onClick=updateQuestions("questionrow_' + data[0][0].questionId + '")></span>';
                    quetable.fnDestroy();
                    var table = document.getElementById("questiontable");
                    var row = table.insertRow(1);
                    var rowid = 'questionrow_' + (parseInt(data[0][0].questionId));
                    $(row).attr('id', rowid);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    cell1.innerHTML = textarea;
                    cell2.innerHTML = type;
                    cell3.innerHTML = Mandatory;
                    cell4.innerHTML = order;
                    cell5.innerHTML = save;

                    $("#questDescriptionAdd").val('');

                    var length1 = parseInt(data[1].length);
                    var orderId = data[1][length1 - 1].order;
                    $("#quesOrderAdd").val(orderId + 1);

                    for (var i = 0; i < data[1].length; i++) {
                        $("#questionrow_" + data[1][i].id + " td input")[0].value = data[1][i].order;
                    }

                    var table = $('#questiontable').dataTable({
                        'aLengthMenu': [
                            [5, 20, 50, 100, -1],
                            ["5", "20", "50", "100", "all"]
                        ],
                        'iDisplayLength': 5,
                        'order': []
                    });
                }


            }
        });
    }
}

function updateQuestions(rowsid) {
    var rowid = rowsid.split('_');
    rowid = parseInt(rowid[1]);
    var textarea1 = $('#' + rowsid + ' td textarea')[0].value;
    var type1 = $('#' + rowsid + ' td select')[0].value;
    var men1 = $('#' + rowsid + ' td select')[1].value;
    var order1 = parseInt($('#' + rowsid + ' td input')[0].value);
    $('.loading').removeClass('hide');
    $.ajax({
        url: '/addEditQuestionByAdmin',
        method: 'POST',
        data: {
            'quesdesc': textarea1,
            'type': type1,
            'Mandatory': men1,
            'order': order1,
            'rowid': rowid
        },
        success: function(data) {
            $('.loading').addClass('hide');
            console.log(data);

            quetable.fnDestroy();

            for (var i = 0; i < data[1].length; i++) {
                $("#questionrow_" + parseInt(data[1][i].id) + " td input")[0].value = data[1][i].order;
            }
            var table = $('#questiontable').dataTable({
                'aLengthMenu': [
                    [5, 20, 50, 100, -1],
                    ["5", "20", "50", "100", "all"]
                ],
                'iDisplayLength': 5,
                'order': []
            });
        }
    });
}
var changeState = function(ChangeId) {
    if (ChangeId == 0) {
        $('#clienttabledivId').removeClass('hide');
        $('#quetabledivId').addClass('hide');
      } else if (ChangeId == 1) {
        $('#clienttabledivId').addClass('hide');
        $('#quetabledivId').removeClass('hide');
    } else if (ChangeId == 2) {
        $('#clienttabledivId').addClass('hide');
        $('#quetabledivId').addClass('hide');
    } else {
        $('#clienttabledivId').removeClass('hide');
        $('#quetabledivId').addClass('hide');
    }
}

function getUploadeFiles(id) {
    var addup = "";
    $('.loading').removeClass('hide');
    $.ajax({
        url: '/getUploadedFiles',
        method: 'POST',
        data: {
            "id": id
        },
        success: function(data) {
            $('.loading').addClass('hide');
            if (data[1].length > 0) {
              addup += '<div class="col-sm-12" style="background: #fff;border-radius: 5px;padding:2%"><div class="col-sm-12" style="background: #00c0f2;padding:10px;border-radius: 5px;color:#fff"><strong>Personal Details</strong></div><div class="col-sm-12" style="padding-top:10px"><div class="row padBtm5"><div class="col-sm-6"><span><strong>Company Name : </strong></span><span>'+ data[1][0].name +'</span></div><div class="col-sm-6"><span><strong>Company Director Name : </strong></span><span>'+ data[1][0].directorName +'</span></div></div><div class="row padBtm5"><div class="col-sm-6"> <span><strong>Email : </strong></span><span>'+ data[1][0].emailId +'</span></div><div class="col-sm-6"> <span><strong>Contact No. : </strong></span><span>'+ data[1][0].contactNo +'</span></div></div><div class="row padBtm5"><div class="col-sm-6"> <span><strong>Address Line 1 : </strong></span><span>'+ data[1][0].address1 +'</span></div><div class="col-sm-6"> <span><strong>Address Line 2 : </strong></span><span>'+ data[1][0].address2 +'</span></div></div><div class="row padBtm5"><div class="col-sm-6"> <span><strong>Address Line 3 : </strong></span><span>'+ data[1][0].address3 +'</span></div><div class="col-sm-6"> <span><strong>State : </strong></span><span>'+ data[1][0].state +'</span></div></div><div class="row padBtm5"><div class="col-sm-6"> <span><strong>City : </strong></span><span>'+ data[1][0].city +'</span></div><div class="col-sm-6"> <span><strong>Pincode : </strong></span><span>'+ data[1][0].pinCode +'</span></div></div></div><div class="col-sm-12" style="background: #00c0f2;padding:10px;border-radius: 5px;color:#fff;margin-top:10px"><strong>Uploaded Files</strong></div><div class="col-sm-12" style="padding-top:10px"><div class="row padBtm5">';  
                  if (data[0].length > 0) {
                      for (var i = 0; i < data[0].length; i++) {
                        addup +='<div class="col-sm-4 padBtm5">';
                        if(data[0][i].fileNameLabel == 1){
                        addup += 'Pancard';
                        }
                        if(data[0][i].fileNameLabel == 2){
                        addup +='Tan No';
                        } 
                        if(data[0][i].fileNameLabel == 3){
                        addup += 'Identity Proof'
                        }
                        addup+= ': <span><strong><i class="fa fa-credit-card" aria-hidden="true"></i> </strong></span><a download href="./attach/' + data[0][i].tempName + '">'+ data[0][i].originalName +' <span class="glyphicon glyphicon-save" title="' + data[0][i].originalName + '"></span></a></div>';
                        /*addup += '<div class="col-sm-12 font"style="margin-top:5%"><div class="col-sm-6"><span>' + data[0][i].originalName + '</span></div><div class="col-sm-6"><a download href="./attach/' + data[0][i].tempName + '"><span class="glyphicon glyphicon-save" title="' + data[0][i].originalName + '"></span></a></div></div></div>'*/
                    }
                } else {
                    addup +='<div class="col-sm-12 text-center padBtm5"><span>No data Found</span></div>';
                }
                addup+='</div></div></div>';
                $("#appendFileData").html(addup);
            } else {
                $("#appendFileData").html('<div class="col-sm-6" style="margin-left:27%;margin-bottom:10%"><span>No Data Found</span></div>');
            }

        }
    });
}

function changeFooter() {
    $('.loading').removeClass('hide');
    $.ajax({
        url: '/changeFooter',
        method: 'POST',
        data: {
            "desc": $('#footerdesc1').val()
        },
        success: function(data) {
            $('.loading').addClass('hide');
            $("#footerId").text($('#footerdesc1').val());
            $("#footerUpdateShow").removeClass("hide");
            setTimeout(function() {
                $("#footerUpdateShow").addClass("hide");
            }, 3000);
        }
    });
}

function NavigationChange() {
       // for bottom nav header  
        var hashValue = $(location).attr('hash');
        var back_active_tab_selector = $('#navAdmin > li.active > a').attr('href');
        $(back_active_tab_selector).addClass('hide');
        var count = 0;
        var flag = 0;
        $('#navAdmin a').each(function() {
            count = count + 1;
            var current_href = $(this).attr('href');
            if (hashValue == current_href) {
                flag = 1;
                $(".HeaderStyle").removeClass("active");
                $("#" + hashValue.substring(1) + "-nav").addClass("active");
                $(hashValue).removeClass("hide");
            } 
            
        });
        if (flag == 0) {
            var firstId=$(".HeaderStyle")[0].id;
                $("#" + firstId).addClass("active");
                var firstHref=$('#'+firstId+' a').attr('href');
                console.log(firstHref);
                $(firstHref).removeClass("hide");
            $(back_active_tab_selector).removeClass('hide');
        }
        // end for bottom nav header

}
$(".HeaderStyle").click(function() {
            var b_active_tab_selector = $('#navAdmin > li.active > a').attr('href');
            $(b_active_tab_selector).addClass('hide');
            $(".HeaderStyle").removeClass("active");
            $(this).addClass("active");
            var active_tab_selector = $('#navAdmin > li.active > a').attr('href');
            $(active_tab_selector).removeClass('hide');
            $('html, body,' + b_active_tab_selector).animate({
                scrollTop: 0
            }, function() {});
});

var mailConfig=function() {
    resetErrorMailConfig();
    var mailConfigService= $('#mailConfigService');
    var mailConfigUser= $('#mailConfigUser');
    var mailConfigPassword= $('#mailConfigPassword');
    var mailConfigPort= $('#mailConfigPort');
    var errormailConfigService= $('#errormailConfigService');
    var errormailConfigUser= $('#errormailConfigUser');
    var errormailConfigPassword= $('#errormailConfigPassword');
    var errormailConfigPort= $('#errormailConfigPort');
    var flag=0;
    var numberCheck = new RegExp(/^\+?[0-9(),.-]+$/);
    if(mailConfigService.val() =="") {
        errormailConfigService.text('Required Field');
        mailConfigService.focus();
        flag=1;
    }
    if(mailConfigUser.val() =="") {
        errormailConfigUser.text('Required Field');
        mailConfigUser.focus();
        flag=1;
    }
    if(mailConfigPassword.val() =="") {
        errormailConfigPassword.text('Required Field');
        mailConfigPassword.focus();
        flag=1;
    }
    if(mailConfigPort.val() =="") {
        errormailConfigPort.text('Required Field');
        mailConfigPort.focus();
        flag=1;
    } else if(!mailConfigPort.val().match(numberCheck)) {
         errormailConfigPort.text('Please enter numeric value');  
         mailConfigPort.focus();
         flag=1;  
    }
    if(flag==1){
        return false;
    } else {
        $('.loading').removeClass('hide');
        $.ajax({
        url: '/mailConfig',
        method: 'POST',
        data: {
            'service': mailConfigService.val(),
            'username': mailConfigUser.val(),
            'password': mailConfigPassword.val(),
            'port': mailConfigPort.val(),
        },
        success: function(data) {
            $('.loading').addClass('hide');
            $('#footerUpdateShow').removeClass('hide');
            setTimeout(function(){
                $('#footerUpdateShow').addClass('hide');
            },1000);
        }
    });
    }

}
var resetErrorMailConfig= function() {
    var errormailConfigService= $('#errormailConfigService');
    var errormailConfigUser= $('#errormailConfigUser');
    var errormailConfigPassword= $('#errormailConfigPassword');
    var errormailConfigPort= $('#errormailConfigPort');
    errormailConfigService.text('');
    errormailConfigUser.text('');
    errormailConfigPassword.text('');
    errormailConfigPort.text('');
}

function filterMyReview(flag) {
        var check=0;
        var email = $("#searchEmail" + flag).val();
        var phone = $("#searchPhone" + flag).val();
        var name = $("#searchName" + flag).val();

            if((email != "") || phone !="" || name !="") {
                if(phone !="" && phone.length != 10 && check == 0){
                    check=1;
                    alert("Please enter 10 digit phone no.");
                } else if(name !="" && name.length < 3 && check == 0){
                    check = 1;
                    alert("Please enter minimum 3 Alphabets in name")
                } else if(email !="" && !validateEmail(email) && check == 0){
                    check = 1;
                    alert("Please enter valid email address")
                } else {
                    otable2.fnDestroy();
                }
                
            } else {
                check=1;
            }

        if(check==1 && flag ==1)
        {
            otable2.fnDestroy();
            otable2 = $("#AllReviewTable").dataTable({
            'aLengthMenu': [
                [8, 20, 50, 100, -1],
                ["10", "20", "50", "100", "all"]
            ],
            'iDisplayLength': 8,
            'order': [],
            columnDefs: [
                        { "width": "40px", "targets": 0 },
                        { "width": "70px", "targets": 1 },
                        { "width": "65px", "targets": 2 },
                        { "width": "50px", "targets": 3 },
                        { "width": "60px", "targets": 4 },
                        { "width": "50px", "targets": 5 }
        ],

            data:[],
            destroy: true
        });
        }
        if(check == 0) {
        
        $('.loading').removeClass('hide');
        $.ajax({
            url: '/filterMyReview',
            method: 'POST',
            data: {
                'email': email,
                'phone': phone,
                'name': name,
                'flag': flag
            },
            success: function(data) {
                $('.loading').addClass('hide');
                var str = "";

                for (var i = 0; i < data[0].length; i++) {
                    str += '<tr id ="row_' + data[0][i].id + '"><td>' + data[0][i].name + '</td><td>' + data[0][i].email + '</td><td>' + data[0][i].alternateEmail + '</td><td>' + data[0][i].phone + '</td><td>' + data[0][i].alternatePhone + '</td><td><span class="glyphicon glyphicon-eye-open" onclick=getUserInfo(' + data[0][i].id + ') title="view Review"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-trash onHoverRed" onclick="deleteUserReview(' + data[0][i].id + ')" title="Delete Review"></span></td></tr>';
                }
                    $("#allreviewbody").html(str);
                    otable2 = $('#AllReviewTable').dataTable({
                        'aLengthMenu': [
                            [8, 20, 50, 100, -1],
                            ["8", "20", "50", "100", "all"]
                        ],
                        'iDisplayLength': 8,

                        columnDefs: [
                        { "width": "40px", "targets": 0 },
                        { "width": "70px", "targets": 1 },
                        { "width": "65px", "targets": 2 },
                        { "width": "50px", "targets": 3 },
                        { "width": "60px", "targets": 4 },
                        { "width": "50px", "targets": 5 }
                        ],

                        'order': []
                    });

            },
            dataType: 'JSON',
        });
    }
    }
    var deleteUserReview= function(id) {
        if(confirm("Are you sure to delete this item?")) {
        $('.loading').removeClass('hide');    
        $.ajax({
            url: '/deleteUserReview',
            method: 'POST',
            data: {
                'id': id,
            },
            success: function(data) {
             $('.loading').addClass('hide');    
                otable2 = $('#AllReviewTable').DataTable();
                otable2
                .row( $('#AllReviewTable tbody #row_'+id) )
                .remove()
                .draw();
            },
            dataType: 'JSON',
        });
       } 
    }

    var modalCloseByCancel= function(id) {
        $('#'+id).trigger("click");
    }

