 $(function() {
        $('.ratebox').raterater({
            submitFunction: 'rateAlert',
            allowChange: true,
            starWidth: 25,
            spaceWidth: 10,
            numStars: 5
        });
    });
    //var records = <%- JSON.stringify(ques); %>;
    var mendetoryQuestionId = [];
    for (var i = 0; i < records.length; i++) {
        if (records[i].isMandatory === 1) {
            mendetoryQuestionId.push(records[i].id);
        }
    }

    $(document).ready(function() {
        // for bottom nav header  
        var hashValue = $(location).attr('hash');
        var back_active_tab_selector = $('#nav > li.activeStyle > a').attr('href');
        $(back_active_tab_selector).addClass('hide');
        var count = 0;
        var flag = 0;
        $('#nav a').each(function() {
            count = count + 1;
            var current_href = $(this).attr('href');
            if (hashValue == current_href) {
                flag = 1;
                $(".HeaderStyle").removeClass("activeStyle");
                $("#" + hashValue.substring(1) + "-nav").addClass("activeStyle");
                $(hashValue).removeClass("hide");
            }
        });
        if (flag == 0) {
            $(back_active_tab_selector).removeClass('hide');
        }
        $('html, body,' + back_active_tab_selector).animate({
            scrollTop: 0
        }, function() {});

        $(".HeaderStyle").click(function() {
            var b_active_tab_selector = $('#nav > li.activeStyle > a').attr('href');
            $(b_active_tab_selector).addClass('hide');
            $(".HeaderStyle").removeClass("activeStyle");
            $(this).addClass("activeStyle");
            var active_tab_selector = $('#nav > li.activeStyle > a').attr('href');
            $(active_tab_selector).removeClass('hide');
            $('html, body,' + b_active_tab_selector).animate({
                scrollTop: 0
            }, function() {});
        });
        // end for bottom nav header
        // for table
        $('.loading').addClass('hide');
        $(".toDisableAll").attr("disabled", "disabled");
        $("#reviewedSecondarySkills").multipleSelect({
            width: '100%'
        });
        otable1 = $("#myReviewTable").dataTable({
            'aLengthMenu': [
                [8, 20, 50, 100, -1],
                ["8", "20", "50", "100", "all"]
            ],
            'iDisplayLength': 8,
            'order': [],
            "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 5 ] } ] , 
            columnDefs: [
                        { "width": "40px", "targets": 0 },
                        { "width": "70px", "targets": 1 },
                        { "width": "65px", "targets": 2 },
                        { "width": "50px", "targets": 3 },
                        { "width": "60px", "targets": 4 },
                        { "width": "50px", "targets": 5 }
            ],
            destroy: true
        });
        otable2 = $("#AllReviewTable").dataTable({
            'aLengthMenu': [
                [8, 20, 50, 100, -1],
                ["10", "20", "50", "100", "all"]
            ],
            'iDisplayLength': 8,
            'order': [],
            
            
              
            destroy: true
        });
        
    });

    var resetReview = function() {
        var reviewedName = $('#reviewedName').val('');
        var reviewedEmail = $('#reviewedEmail').val('');
        var reviewedPhone = $('#reviewedPhone').val('');
        var reviewedAlternateEmail = $('#reviewedAlternateEmail').val('');
        var reviewedAlternateNumber = $('#reviewedAlternateNumber').val('');
        var reviewedPrimarySkills = $('#reviewedPrimarySkills').val('');
        var reviewdescription = $('#reviewdescription').val('');
        var reviewedMonth = $('#reviewedMonth').val('0');
        var reviewedYear = $('#reviewedYear').val('0');
        var reviewedSecondarySkills = $('#reviewedSecondarySkills').val('');
        $('#reviewedPhoneCountryCode').val('+91');
        $('#rAlternateNumberCountryCode').val('+91');
        $('.raterater-layer').removeClass('rated');
        if ($('.raterater-layer').css('display') == 'block') {
            $('.raterater-layer.raterater-rating-layer').css('display', 'none');

        }
        $(".fa-thumbs-up").css("color", "");
        $(".fa-thumbs-down").css("color", "");
        ansErrorId = [];
        for (i = 0; i < records.length; i++) {
            //ans.push($('#ans'+records[i].id).val());
            ansErrorId.push('#error' + records[i].id);
            $(ansErrorId[i]).text('');
            if (records[i].answerType == 1) {
                showHideRadio('#radio1No' + records[i].id, '#radio2No' + records[i].id, '#radio1Yes' + records[i].id, '#radio2Yes' + records[i].id, '#ans' + records[i].id, '');
            }
        }

    }

    var resetError = function() {
        var errorReviewedName = '#errorReviewedName';
        var errorReviewedEmail = '#errorReviewedEmail';
        var errorReviewedPhone = '#errorReviewedPhone';
        var errorReviewedAlternateEmail = '#errorReviewedAlternateEmail';
        var errorReviewedPrimarySkills = '#errorReviewedPrimarySkills';
        var errorReviewdDesc = '#errorReviewdDesc';
        var errorReviewedAlternate = '#errorReviewedAlternate';
        $(errorReviewedName).text('');
        $(errorReviewedEmail).text('');
        $(errorReviewedPhone).text('');
        $(errorReviewedAlternateEmail).text('');
        $(errorReviewedPrimarySkills).text('');
        $(errorReviewdDesc).text('');
        $(errorReviewedAlternate).text('');
    }

    var reviewed = function() {
        resetError();
        var reviewedName = $('#reviewedName').val();
        var reviewedEmail = $('#reviewedEmail').val();
        var reviewedPhone = $('#reviewedPhone').val();
        var countryCode = $('#reviewedPhoneCountryCode').val();
        var reviewedAlternateEmail = $('#reviewedAlternateEmail').val();
        var reviewedAlternateNumber = $('#reviewedAlternateNumber').val();
        var altCountryCode = $('#rAlternateNumberCountryCode').val();
        var reviewedPrimarySkills = $('#reviewedPrimarySkills').val();
        var reviewdescription = $('#reviewdescription').val();
        var reviewedMonth = $('#reviewedMonth').val();
        var reviewedYear = $('#reviewedYear').val();
        var reviewedSecondarySkills = $('#reviewedSecondarySkills').val();
        var errorReviewedName = '#errorReviewedName';
        var errorReviewedEmail = '#errorReviewedEmail';
        var errorReviewedPhone = '#errorReviewedPhone';
        var errorReviewedAlternateEmail = '#errorReviewedAlternateEmail';
        var errorReviewedPrimarySkills = '#errorReviewedPrimarySkills';
        var errorReviewdDesc = '#errorReviewdDesc';
        var reviewedSecondarySkillsStr = [];

        var error = 0;
        //var records = <%- JSON.stringify(ques); %>;
        var qa = [];
        var isMan = [];
        var ansErrorId = [];
        var ansValid = true;
        var type = [];
        var qId = [];
        var ans = [];
        var questionId = [];
        var answerVal = [];

        if (reviewedName === '') {
            $('#reviewedName').focus();
            $(errorReviewedName).text('Required Field');
            return false;
        } else if (reviewedName.length < 3) {
            $('#reviewedName').focus();
            $(errorReviewedName).text('Minimum 3 character');
            return false;
        }
        /*else if (!reviewedName.match(/^[A-Za-z]+$/)) {
               $(errorReviewedName).text('Only Alphabets');
               return false;
             }*/
        else if (reviewedEmail === '') {
            $('#reviewedEmail').focus();
            $(errorReviewedEmail).text('Required Field');
            return false;
        } else if (!validateEmail(reviewedEmail)) {
            $('#reviewedEmail').focus();
            $(errorReviewedEmail).text('Enter Correct Email');
            return false;
        } else if (reviewedAlternateEmail !== '' && !validateEmail(reviewedAlternateEmail)) {
            $('#reviewedAlternateEmail').focus();
            $(errorReviewedAlternateEmail).text('Enter Correct Email');
            return false;
        } else if (reviewedAlternateEmail !== '' && reviewedAlternateEmail == reviewedEmail) {
            $('#reviewedAlternateEmail').focus();
            $(errorReviewedAlternateEmail).text('Provide another Email');
            return false;
        } else if (reviewedPhone === '') {
            $('#reviewedPhone').focus();
            $(errorReviewedPhone).text('Required Field');
            return false;
        } else if (reviewedPhone.length < 10) {
            $('#reviewedPhone').focus();
            $(errorReviewedPhone).text('Enter Correct Number');
            return false;
        } else if (reviewedPhone.length > 10) {
            $('#reviewedPhone').focus();
            $(errorReviewedPhone).text('Enter Correct Number');
            return false;
        } else if (!reviewedPhone.match(/^[0-9]+$/)) {
            $('#reviewedPhone').focus();
            $(errorReviewedPhone).text('Enter Correct Number');
            return false;
        } else if (reviewedAlternateNumber != "" && reviewedAlternateNumber == reviewedPhone) {
            $('#reviewedAlternateNumber').focus();
            $(errorReviewedAlternate).text('Provide another Number');
            return false;
        } else if (reviewedAlternateNumber !== '' && !reviewedAlternateNumber.match(/^[0-9]+$/)) {
            $('#reviewedAlternateNumber').focus();
            $(errorReviewedAlternate).text('Enter Correct Number');
            return false;
        } else if (reviewedAlternateNumber !== '' && reviewedAlternateNumber.length < 10) {
            $('#reviewedAlternateNumber').focus();
            $(errorReviewedAlternate).text('Enter Correct Number');
            return false;
        } else if (reviewedAlternateNumber !== '' && reviewedAlternateNumber.length > 10) {
            $('#reviewedAlternateNumber').focus();
            $(errorReviewedAlternate).text('Enter Correct Number');
            return false;
        } /*else if (reviewedPrimarySkills === '') {
            $('#reviewedPrimarySkills').focus();
            $(errorReviewedPrimarySkills).text('Required Field');
            return false;
        }*/ else {
            if (countryCode == "") {
                $('#reviewedPhoneCountryCode').val('+91');
                countryCode = '+91';
            }

            if (altCountryCode == "") {
                $('#rAlternateNumberCountryCode').val('+91');
                altCountryCode = '+91';
            }


            for (var i = 0; i < records.length; i++) {
                //ans.push($('#ans'+records[i].id).val());
                var data = {
                    qId: records[i].id,
                    ans: $('#ans' + records[i].id).val()
                };
                qa.push(data);
                if ($('#ans' + records[i].id).val() != "") {
                    questionId.push(records[i].id);
                    answerVal.push($('#ans' + records[i].id).val());
                }
                isMan.push($('#isMan' + records[i].id).val());
                ansErrorId.push('#error' + records[i].id);
                $(ansErrorId[i]).text('');
            }

            for (var i = 0; i < isMan.length; i++) {
                if (isMan[i] === '1' && (qa[i].ans === '' || qa[i].ans === undefined)) {
                    $(ansErrorId[i]).text('Required Field');
                    ansValid = false;
                }
            }

            if (error == 0 && ansValid == true) {
                $('.loading').removeClass('hide');
                $('#submitReviewId').attr('disabled', 'disabled');

                if (reviewedSecondarySkills != null) {
                    for (var j = 0; j < reviewedSecondarySkills.length; j++) {
                        reviewedSecondarySkillsStr.push(reviewedSecondarySkills[j]);
                    }
                }
                var data = {
                    reviewedName: reviewedName,
                    reviewedEmail: reviewedEmail,
                    reviewedAlternateEmail: reviewedAlternateEmail,
                    reviewedPhone: reviewedPhone,
                    reviewedAlternateNumber: reviewedAlternateNumber,
                    reviewedPrimarySkills: reviewedPrimarySkills,
                    reviewedSecondarySkills: reviewedSecondarySkillsStr.toString(),
                    reviewedYear: reviewedYear,
                    reviewedMonth: reviewedMonth,
                    reviewQuesId: questionId.toString(),
                    reviewAnsVal: answerVal.toString(),
                    reviewdescription: reviewdescription,
                    countryCode: countryCode,
                    altCountryCode: altCountryCode
                };

                $.ajax({
                    url: '/review',
                    method: 'POST',
                    data: data,
                    success: function(data) {

                        $('.loading').addClass('hide');
                        $('#successReviewMsg').text("Successfully Added");
                        $('#submitReviewId').removeAttr('disabled');
                        var iconButton = '<span class="glyphicon glyphicon-eye-open" onclick=getUserInfo(' + data[0][0].id + ')></span>';

                        otable1.fnAddData([$("#reviewedName").val(), $("#reviewedEmail").val(), $("#reviewedAlternateEmail").val(), $("#reviewedPhone").val(), $("#reviewedAlternateNumber").val(), iconButton]);

                        /*otable2.fnAddData([$("#reviewedName").val(), $("#reviewedEmail").val(), $("#reviewedAlternateEmail").val(), $("#reviewedPhone").val(), $("#reviewedAlternateNumber").val(), iconButton]);
                        $('#totalReviewd').html('<strong>Total Review: ' + data[1][0].totalReview + '</strong>');*/
                        resetReview();
                        setTimeout(function() {
                            $('#successReviewMsg').text('');

                        }, 9000);
                    },
                    dataType: 'JSON',
                });
            }
        }
    }
    var changeState = function(ChangeId) {

        if (ChangeId == 0) {
            $('#addReview').removeClass('hide');
            $('#myReview').addClass('hide');
        } else if (ChangeId == 1) {
            $('#addReview').addClass('hide');
            $('#myReview').removeClass('hide');
        } else {
            $('#addReview').removeClass('hide');
            $('#myReview').addClass('hide');
        }
    }

    var comparisonForMendetroy = [];

    var showHideRadio = function(show1, show2, hide1, hide2, object, value) {
        var index1 = object.substring(4);

        if (mendetoryQuestionId.indexOf(parseInt(index1)) >= 0) {
            comparisonForMendetroy.push(index1);
        }
        if (comparisonForMendetroy.length === mendetoryQuestionId.length) {
            $("#submitReviewId").removeClass('hide');
            $("#submitReviewId").addClass('btn btn-primary');
        }
        $(show1).show();
        $(show2).show();
        $(hide1).hide();
        $(hide2).hide();
        $(object).val(value);
    }

    function getUserInfo(id,showNav) {
        $.ajax({
            url: '/submitUserId',
            method: 'POST',
            data: {
                'id': id,
                'backLocation': window.location.href,
                'showNav':showNav
            },
            success: function(data) {
                window.location.href = 'edit'
            },
            dataType: 'JSON',
        });
    }

    function rateAlert(id, rating) {
        var splitId = id.split('_');

        $("#" + splitId[0] + splitId[1]).val(rating);

    }

    function checkFileType() {
        return true;
        /*var filename;
            var fileType;
            var fileType1;
             for(i=0;i<=2;i++){
              var c="";
              if(i!=0)
                c=i;
              filename=$("#fileAttach"+c).val();
              fileType=filename.split('.');
              fileType1=fileType[fileType.length-1];
              if(fileType1=="jpeg" || fileType1=="png" || fileType1=="jpg" || fileType1=="pdf" || fileType1=="doc" || fileType1=="docx" ){

              }else{
                alert("file format not accepted");
                return  false;
               }
           }*/

    }

    function filterMyReview(flag) {
        var check=0;
        var email = $("#searchEmail" + flag).val();
        var phone = $("#searchPhone" + flag).val();
        var name = $("#searchName" + flag).val();
        if (flag == 0) {
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
                    otable1.fnDestroy();
                }
            }
            else {
                    otable1.fnDestroy();
            }
        } else {
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

                if (flag == 0) {
                for (var i = 0; i < data[0].length; i++) {
                    str += '<tr id ="' + data[0][i].id + '"><td>' + data[0][i].name + '</td><td>' + data[0][i].email + '</td><td>' + data[0][i].alternateEmail + '</td><td>' + data[0][i].phone + '</td><td>' + data[0][i].alternatePhone + '</td><td><span class="glyphicon glyphicon-eye-open" onclick="getUserInfo(' + data[0][i].id + ',1)"></span></td></tr>';
                }
                    $("#myreviewbody").html(str);
                    otable1 = $('#myReviewTable').dataTable({
                        'aLengthMenu': [
                            [8, 20, 50, 100, -1],
                            ["8", "20", "50", "100", "all"]
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
                    });
                } else {
                for (var i = 0; i < data[0].length; i++) {
                    str += '<tr id ="' + data[0][i].id + '"><td>' + data[0][i].name + '</td><td>' + data[0][i].email + '</td><td>' + data[0][i].alternateEmail + '</td><td>' + data[0][i].phone + '</td><td>' + data[0][i].alternatePhone + '</td><td><span class="glyphicon glyphicon-eye-open" onclick="getUserInfo(' + data[0][i].id + ',2)"></span></td></tr>';
                }
                    $("#allreviewbody").html(str);
                    otable2 = $('#AllReviewTable').dataTable({
                        'aLengthMenu': [
                            [8, 20, 50, 100, -1],
                            ["8", "20", "50", "100", "all"]
                        ],
                        'iDisplayLength': 8,
                        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 5 ] } ] ,
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
                }

            },
            dataType: 'JSON',
        });
    }
    }

    function submitThumsValue(id, val) {
        var arrayid = id.split('ns');
        if (val === 2) {
            $("#thumbsdown_" + arrayid[1]).css("color", "red");
            $("#thumbsup_" + arrayid[1]).css("color", "#bfbfbf");
        } else {
            $("#thumbsup_" + arrayid[1]).css("color", "#00c0f2");
            $("#thumbsdown_" + arrayid[1]).css("color", "#bfbfbf");
        }
        $(id).val(val);
    }
    $("#searchEmail0,#searchPhone0,#searchName0").bind("keyup", CalculateTotalOnKeyUpEvent);
    $("#searchEmail1,#searchPhone1,#searchName1").bind("keyup", CalculateTotalOnKeyUpEvent1);

    function CalculateTotalOnKeyUpEvent(e) {
        if (e.keyCode == 13) {
            filterMyReview(0);
        }
    }

    function CalculateTotalOnKeyUpEvent1(e) {
        if (e.keyCode == 13) {
            filterMyReview(1);
        }
    }
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
