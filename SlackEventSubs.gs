// 라이브러리 선언
var slack = slack_sdk;
var drive_app = driveapp_api;
var blocks = blocks_kit
var lib = library;

function doPost(e) {
  /** SET TOKEN */      
  var SLACK_TOKEN = "{SLACK_TOKEN}";
  /** 참조 시트 */  
  var sheetName = "action"
  var spreadsheetId = '{SPREADSHEET_ID}';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var SLACK_URI = "{"https://{WORKSPACE}.slack.com"}"
  
  /** SLACK LOG */
  var sheet = spreadsheet.getSheetByName(sheetName);

  /** JSON Parser */
  var param = e.parameter;
  var data = param.payload;
  var json = JSON.parse(data);
  sheet.getRange("E5").setValue(JSON.stringify(json));
  
  /** SLACK - ACTION | button value,  */
  if("actions" in json){

    if (json.actions[0].value === "create-project"){
      /** 신규프로젝트 생성 */

      var payload_blocks = JSON.stringify({"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"*:dart: 신규 프로젝트* 를 생성합니다. 아래 `양식`을 입력해주세요 "}},{"type":"divider"},{"type":"input","element":{"type":"static_select","placeholder":{"type":"plain_text","text":"부서를 선택하세요","emoji":true},"options":[{"text":{"type":"plain_text","text":"마케팅팀","emoji":true},"value":"마케팅"},{"text":{"type":"plain_text","text":"SW개발팀","emoji":true},"value":"SW개발"},{"text":{"type":"plain_text","text":"미디어팀","emoji":true},"value":"미디어"},{"text":{"type":"plain_text","text":"디자인팀","emoji":true},"value":"디자인"}],"action_id":"department-create-project"},"label":{"type":"plain_text","text":"1️⃣ 신규 프로젝트를 생성할 부서를 선택하세요.","emoji":true}},{"type":"input","element":{"type":"plain_text_input","action_id":"title-create-project"},"label":{"type":"plain_text","text":"2️⃣ 프로젝트 이름을 입력하세요","emoji":true}},{"type":"input","element":{"type":"multi_static_select","placeholder":{"type":"plain_text","text":"정량 서류 리스트","emoji":true},"options":[{"text":{"type":"plain_text","text":"없음","emoji":true},"value":"X"},{"text":{"type":"plain_text","text":"사업자등록증","emoji":true},"value":"사업자등록증"},{"text":{"type":"plain_text","text":"비디오물제작업신고증","emoji":true},"value":"비디오물제작업신고증"},{"text":{"type":"plain_text","text":"경쟁입찰참가자격등록증","emoji":true},"value":"경쟁입찰참가자격등록증"},{"text":{"type":"plain_text","text":"3개년재무제표","emoji":true},"value":"3개년재무제표"},{"text":{"type":"plain_text","text":"창업기업확인서","emoji":true},"value":"창업기업확인서"},{"text":{"type":"plain_text","text":"직접생산증명서(정보시스템유지관리)","emoji":true},"value":"직접생산증명서(정보시스템유지관리)"},{"text":{"type":"plain_text","text":"직접생산증명서(인터넷지원개발)","emoji":true},"value":"직접생산증명서(인터넷지원개발)"},{"text":{"type":"plain_text","text":"직접생산증명서(소프트웨어엔지니어링업)","emoji":true},"value":"직접생산증명서(소프트웨어엔지니어링업)"},{"text":{"type":"plain_text","text":"직접생산증명서(동영상제작서비스)","emoji":true},"value":"직접생산증명서(동영상제작서비스)"},{"text":{"type":"plain_text","text":"직접생산증명서(기타행사기획및대행서비스)","emoji":true},"value":"직접생산증명서(기타행사기획및대행서비스)"},{"text":{"type":"plain_text","text":"중소기업확인서(공공기관용)","emoji":true},"value":"중소기업확인서(공공기관용)"},{"text":{"type":"plain_text","text":"중소기업확인서(공공기관외)","emoji":true},"value":"중소기업확인서(공공기관외)"},{"text":{"type":"plain_text","text":"인감증명서","emoji":true},"value":"인감증명서"},{"text":{"type":"plain_text","text":"등기부등본","emoji":true},"value":"등기부등본"},{"text":{"type":"plain_text","text":"기업신용평가등급확인서","emoji":true},"value":"기업신용평가등급확인서"},{"text":{"type":"plain_text","text":"4대보험완납증명서","emoji":true},"value":"4대보험완납증명서"},{"text":{"type":"plain_text","text":"4대보험가입자명부","emoji":true},"value":"4대보험가입자명부"}],"action_id":"docs-create-project"},"label":{"type":"plain_text","text":"3️⃣ 필요한 정량서류를 선택해주세요.","emoji":true}},{"type":"divider"},{"type":"section","text":{"type":"mrkdwn","text":":hot-desking: *`구글 드라이브 셋팅 중이에요!` 메시지가 나오면 정상!*"}},{"type":"context","elements":[{"type":"mrkdwn","text":":man-gesturing-ok: *`연결하는 데 문제가 발생했습니다.`* 라는 메시지가 나와도 놀라지마세요!"}]}]});

      var private_metadata_dataset = json.channel.id + ","+ json.container.message_ts 
      
      Logger.log(private_metadata_dataset);
      /** SLACK open modal */
      var lg = slack.openViewModal(json.trigger_id, json.channel.id, "신규 제안서 작성", payload_blocks, private_metadata_dataset, SLACK_TOKEN);

      Logger.log(lg);


    }else if (json.actions[0].value === "static-docs-project"){
      /**정량서류 일괄 다운로드 */
      // var payload_blocks = blocks.getBlocksFromSheet(sheetName, spreadsheetId, "static-docs-project");
      var payload_blocks = JSON.stringify({"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"*:card_file_box: 정량서류 모으기* 를 시작합니다. "}},{"type":"divider"},{"type":"input","element":{"type":"multi_static_select","placeholder":{"type":"plain_text","text":"정량 서류 리스트","emoji":true},"options":[{"text":{"type":"plain_text","text":"사업자등록증","emoji":true},"value":"사업자등록증"},{"text":{"type":"plain_text","text":"비디오물제작업신고증","emoji":true},"value":"비디오물제작업신고증"},{"text":{"type":"plain_text","text":"경쟁입찰참가자격등록증","emoji":true},"value":"경쟁입찰참가자격등록증"},{"text":{"type":"plain_text","text":"3개년재무제표","emoji":true},"value":"3개년재무제표"},{"text":{"type":"plain_text","text":"창업기업확인서","emoji":true},"value":"창업기업확인서"},{"text":{"type":"plain_text","text":"직접생산증명서(정보시스템유지관리)","emoji":true},"value":"직접생산증명서(정보시스템유지관리)"},{"text":{"type":"plain_text","text":"직접생산증명서(인터넷지원개발)","emoji":true},"value":"직접생산증명서(인터넷지원개발)"},{"text":{"type":"plain_text","text":"직접생산증명서(소프트웨어엔지니어링업)","emoji":true},"value":"직접생산증명서(소프트웨어엔지니어링업)"},{"text":{"type":"plain_text","text":"직접생산증명서(동영상제작서비스)","emoji":true},"value":"직접생산증명서(동영상제작서비스)"},{"text":{"type":"plain_text","text":"직접생산증명서(기타행사기획및대행서비스)","emoji":true},"value":"직접생산증명서(기타행사기획및대행서비스)"},{"text":{"type":"plain_text","text":"중소기업확인서(공공기관용)","emoji":true},"value":"중소기업확인서(공공기관용)"},{"text":{"type":"plain_text","text":"중소기업확인서(공공기관외)","emoji":true},"value":"중소기업확인서(공공기관외)"},{"text":{"type":"plain_text","text":"인감증명서","emoji":true},"value":"인감증명서"},{"text":{"type":"plain_text","text":"등기부등본","emoji":true},"value":"등기부등본"},{"text":{"type":"plain_text","text":"기업신용평가등급확인서","emoji":true},"value":"기업신용평가등급확인서"},{"text":{"type":"plain_text","text":"4대보험완납증명서","emoji":true},"value":"4대보험완납증명서"},{"text":{"type":"plain_text","text":"4대보험가입자명부","emoji":true},"value":"4대보험가입자명부"}],"action_id":"docs-create-project"},"label":{"type":"plain_text","text":"1️⃣ 필요한 정량서류를 선택해주세요.","emoji":true}},{"type":"divider"},{"type":"context","elements":[{"type":"mrkdwn","text":"*목록에 없는 서류는 `#1-ask-bs` 채널에 문의하세요!*"}]},{"type":"divider"},{"type":"section","text":{"type":"mrkdwn","text":":hot-desking: *`쓰레드`* 댓글을 확인해주세요!"}},{"type":"context","elements":[{"type":"mrkdwn","text":":man-gesturing-ok: *`연결하는 데 문제가 발생했습니다.`* 라는 메시지가 나와도 놀라지마세요!"}]}]});
      var private_metadata_dataset = json.channel.id + ","+ json.container.message_ts

      /** SLACK open modal */
      // trigger_id, channelId, title, blocks, slack_token
      slack.openViewModal(json.trigger_id, json.channel.id, "정량 서류 다운로드", payload_blocks, private_metadata_dataset, SLACK_TOKEN);
      
    }else if (json.actions[0].action_id === "create-channel"){
      

      /** 채널 신규 생성 */
      var getOrCreateChannel = slack.createOpenSlackChannel(json.actions[0].value, false, SLACK_TOKEN);
      var response;
      if(getOrCreateChannel.hasOwnProperty('id')){
        response = "<" + SLACK_URI + "/archives/" + String(getOrCreateChannel.id) + "|" + getOrCreateChannel.name + ">"; 
      }else if(getOrCreateChannel === "name_taken") {
        response = "<" + SLACK_URI + "/archives/" + String(getOrCreateChannel.id) + "|" + getOrCreateChannel.name + ">"; 
      }else{
        response = getOrCreateChannel;
      }
      Logger.log(response);
      slack.sendMessage("채널 `Join` 하세요: " + response, json.channel.id, SLACK_TOKEN);


    }else if (json.actions[0].value === "x"){
      slack.updateMessage(
        json.container.channel_id,
        json.container.message_ts,
        ":no_entry: 채널 생성이 취소되었습니다.",
         SLACK_TOKEN
      );

    }else{
      /** LOG  message */
      slack.sendMessage("[LOG] 다른 버튼 클릭: "+ json.actions[0].value, json.channel.id, SLACK_TOKEN);
    }
    return ContentService.createTextOutput(JSON.stringify({}))
        .setMimeType(ContentService.MimeType.JSON);
  }

  /** SLACK - TYPE | modal closed,  */
  if ("type" in json){
    if(json.type === "view_submission"){
      
      
      if(json.view.title.text === "신규 제안서 작성"){
        var departmentValue = slack.getInputDataByName(json.view.state.values, 'department-create-project'); // list and only One
        var titleCreateProjectValue = slack.getInputDataByName(json.view.state.values, 'title-create-project'); // string
        var selectedDocs = slack.getInputDataByName(json.view.state.values, 'docs-create-project'); // list and min 1 ~
        
        /** 비동기 작업 시작을 위한 트리거 설정 */
        var container_message_ts = json.view.private_metadata.split(",")[1];

        if(selectedDocs.includes("X")){
          selectedDocs = [];
        }
        var triggerData = {
          trigger_type: "create-project",
          departmentValue: departmentValue,
          projectName: titleCreateProjectValue,
          selectedDocs: selectedDocs,
          channel_id: json.view.private_metadata.split(",")[0],
          container_message_ts: container_message_ts,
          user_id: json.user.id
        };

        /** 비동기 작업을 위한 기존 메시지 수정 */
        if(container_message_ts){
          slack.updateMessage(
            json.view.private_metadata.split(",")[0],
            container_message_ts,
            ":hot-desking: *구글 드라이브* 셋팅 중이에요!\n> *프로젝트명*: "+titleCreateProjectValue+" \n완료되면 알려드릴게요!",
            SLACK_TOKEN
          );
        }
        
        // // 트리거 ID 생성
        var triggerId = slack.generateUUID();
        
        // trigger_sheet에 추가하기
        var trigger_sheet = spreadsheet.getSheetByName("trigger");
        var trigger_lastRow = trigger_sheet.getLastRow();
        /** A: trigger 등록 날짜 */
        trigger_sheet.getRange("A"+String(trigger_lastRow+1)).setValue(new Date());
        /** B: trigger Task Type - Task 타입 지정 */
        trigger_sheet.getRange("B"+String(trigger_lastRow+1)).setValue("create-project");
        /** B: trigger Task UUID - 트리거 데이터 저장용 ID 값 */
        trigger_sheet.getRange("C"+String(trigger_lastRow+1)).setValue(triggerId);
        /** C: trigger 프로젝트명 */
        trigger_sheet.getRange("D"+String(trigger_lastRow+1)).setValue(titleCreateProjectValue);
        /** F: trigger 요청 user id (고유값) */
        trigger_sheet.getRange("G"+String(trigger_lastRow+1)).setValue(SLACK_URI+"team/"+json.user.id);
        /** I: trigger 요청 부서명 (고유값) */
        trigger_sheet.getRange("J"+String(trigger_lastRow+1)).setValue(departmentValue);
 
        // // 트리거 데이터와 ID를 저장
        PropertiesService.getScriptProperties().setProperty(triggerId, JSON.stringify(triggerData));
        ScriptApp.newTrigger('createProjectCopyFiles')
          .timeBased()
          .after(2*1000)
          .create()
          .getUniqueId();

      }else if(json.view.title.text === "정량 서류 다운로드"){
        /** 비동기 작업 시작을 위한 트리거 설정 */
        var container_message_ts = json.view.private_metadata.split(",")[1];
        /** 비동기 작업을 위한 기존 메시지 수정 */
        if(container_message_ts){
          slack.updateMessage(
            json.view.private_metadata.split(",")[0],
            container_message_ts,
            ":hot-desking: 요청하신 *정량서류* :pdf: 파일들을 압축중이에요! - from :google:",
            SLACK_TOKEN
          );
        }
        var selectedDocs = slack.getInputDataByName(json.view.state.values, 'docs-create-project'); // list and min 1 ~
        
        /** 비동기 작업 시작을 위한 트리거 설정 */
        var triggerData = {
          trigger_type: "docs-download",
          selectedDocs: selectedDocs,
          channel_id: json.view.private_metadata.split(",")[0],
          container_message_ts: container_message_ts,
          user_id: json.user.id
        };

        // // 트리거 ID 생성
        var triggerId = slack.generateUUID();
        
        // trigger_sheet에 추가하기
        var trigger_sheet = spreadsheet.getSheetByName("trigger");
        var trigger_lastRow = trigger_sheet.getLastRow();
        /** A: trigger 등록 날짜 */
        trigger_sheet.getRange("A"+String(trigger_lastRow+1)).setValue(new Date());
        /** B: trigger Task Type - Task 타입 지정 */
        trigger_sheet.getRange("B"+String(trigger_lastRow+1)).setValue("docs-download");
        /** C: trigger Task UUID - 트리거 데이터 저장용 ID 값 */
        trigger_sheet.getRange("C"+String(trigger_lastRow+1)).setValue(triggerId);
        /** D: trigger 파일 리스트 */
        trigger_sheet.getRange("D"+String(trigger_lastRow+1)).setValue(JSON.stringify(selectedDocs));
        /** G: trigger 요청 user id (고유값) */
        trigger_sheet.getRange("G"+String(trigger_lastRow+1)).setValue(SLACK_URI + "/team/"+json.user.id);

 
        // // 트리거 데이터와 ID를 저장
        PropertiesService.getScriptProperties().setProperty(triggerId, JSON.stringify(triggerData));
        ScriptApp.newTrigger('zipFileCreate')
          .timeBased()
          .after(1*1500)
          .create()
          .getUniqueId();

      }else{
        /** LOG  message */
        slack.sendThreadedMessage("[LOG] 다른 modal 창의 title text: "+ json.view.title.text, json.view.private_metadata.split(",")[0], json.view.private_metadata.split(",")[1], SLACK_TOKEN);
      }

    }
    return ContentService.createTextOutput(JSON.stringify({}))
        .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({}))
        .setMimeType(ContentService.MimeType.JSON);
}

/** 비동기: 제안서> 1.프로젝트 생성 */
function createProjectCopyFiles(){
  // trigger_sheet 에서 참조하기
  var spreadsheetId = '{SPREADSHEET_ID}';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var trigger_sheet = spreadsheet.getSheetByName("trigger");
  var trigger_lastRow = trigger_sheet.getLastRow();

  var logSheetId = "{LOG_SHEET_ID}";
  var logSpreadSheet = SpreadsheetApp.openById(logSheetId);
  var log_sheet = logSpreadSheet.getSheetByName("정량서류발급내역");
  


  var trigger_id = "";
  var trigger_row;
  var signiture = "";
  /** E1:E 까지 중 완료 서명 없는 것 처리하기 */
  for(var i=2; i<trigger_lastRow+1; i++){
    /** E: trigger Task 완료 서명 */
    signiture = trigger_sheet.getRange("E"+String(i)).getValue();
    if(signiture === ""){
      Logger.log("빈서명 row: E" + String(i) + ", " + signiture);
      trigger_row = i;
      trigger_id = trigger_sheet.getRange("C"+String(i)).getValue()
      // trigger id
      trigger_sheet.getRange("F"+String(trigger_row)).setValue(trigger_id);
      break;
    }
  }
  
  if (trigger_id){
    // 트리거 데이터
    var scriptProperties  = PropertiesService.getScriptProperties().getProperty(trigger_id);

    if (scriptProperties !== null) {
      var SLACK_TOKEN = "{SLACK_TOKEN}";

      var latestTriggerData = JSON.parse(scriptProperties);

      if(latestTriggerData.trigger_type === "create-project"){
        var departmentValue = latestTriggerData.departmentValue;
        var titleCreateProjectValue = latestTriggerData.projectName;
        var selectedDocs = latestTriggerData.selectedDocs;
        var channel_id = latestTriggerData.channel_id;
        var container_message_ts = latestTriggerData.container_message_ts;
        var user_id = latestTriggerData.user_id;
        
        if(container_message_ts){
          slack.updateMessage(
            channel_id,
            container_message_ts,
            "> :google: *`[" + departmentValue + "]" + titleCreateProjectValue +" 프로젝트`가 생성되고 있어요! :hot-desking: 조금만 더 기다려주세요! *",
            SLACK_TOKEN
          );
        }

        /** 프로젝트 폴더 생성 */
        var projectFolderId = drive_app.createSubFolder(departmentValue+"팀_제안서", departmentValue, titleCreateProjectValue);
        if(projectFolderId){
          Logger.log("####### 루프 돌기 ####### ");
          /** 서류 복사하기*/
          var copyFileLog = ""
          for(var i=0; i<selectedDocs.length; i++){
            Logger.log("파일명: "+selectedDocs[i]);
            var copyFileId = drive_app.copyFileToFolder("서류" ,selectedDocs[i], titleCreateProjectValue, departmentValue);
            if(copyFileId){
              /** LOG  message */
              Logger.log("copy 성공");
              copyFileLog += "[200]" + selectedDocs[i] + ", "
              // 로그 남기기 - 마지막 열 추적
              var log_sheet_lastRow = log_sheet.getLastRow();
              /** 로그: 시간 */
              log_sheet.getRange("A"+String(log_sheet_lastRow+1)).setValue(new Date());
              /** 부서명 */
              log_sheet.getRange("B"+String(log_sheet_lastRow+1)).setValue(departmentValue);
              /** 사용자ID */
              log_sheet.getRange("C"+String(log_sheet_lastRow+1)).setValue(SLACK_URI + "/team/"+user_id);
              /** 정량서류명 */
              log_sheet.getRange("D"+String(log_sheet_lastRow+1)).setValue(selectedDocs[i]);
              /** 비고 */
              log_sheet.getRange("E"+String(log_sheet_lastRow+1)).setValue(titleCreateProjectValue);
            }else{
              /** Error message */
              Logger.log("Copy Fail: " + selectedDocs[i]);
              copyFileLog += "[500]" + selectedDocs[i] + ", "
              // slack.sendThreadedMessage(":rotating_light: `"+ selectedDocs[i] +"` 문서를 찾지 못했어요.\n* 경영지원팀(`#ask-bs`)에 대신 물어봐 드릴게요! ", channel_id, thread_ts, SLACK_TOKEN);

              // #ask-business-support 채널
              slack.updateMessage(":fire: `"+ departmentValue +"`팀에서 다음 문서를 찾고 있어요: `"+ selectedDocs[i] +"` \n> `정량서류` 폴더를 확인해주세요! ","{#ASK-BM}", SLACK_TOKEN);
            
            }
          }
        
          // trigger 종료 로그
          trigger_sheet.getRange("H"+String(trigger_row)).setValue(copyFileLog);
          var folder_url = DriveApp.getFoldersByName(titleCreateProjectValue).next().getUrl();
          trigger_sheet.getRange("I"+String(trigger_row)).setValue(String(folder_url));

          slack.updateMessage(
            channel_id,
            container_message_ts,
            ":mega: *`"+ titleCreateProjectValue +" 프로젝트`가 생성되었어요!*\n\n:ok: <"+String(folder_url)+"|Google Drive 폴더> 에서 확인할 수 있어요!",
            SLACK_TOKEN
          );

        }

      }

      /** D: trigger Task 완료 서명 */
      trigger_sheet.getRange("E"+String(trigger_row)).setValue(slack.generateUUID());
      PropertiesService.getUserProperties().deleteProperty(trigger_id);
      /** 트리거 삭제 */
      lib.deleteTriggers();
    }
  }
   
}

/** 비동기: 2.서류 요청 */
function zipFileCreate(){
  // trigger_sheet 에서 참조하기
  var spreadsheetId = '{SPREADSHEET_ID}';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var trigger_sheet = spreadsheet.getSheetByName("trigger");
  var trigger_lastRow = trigger_sheet.getLastRow();

  var logSheetId = "{LOG_SPREADSHEET_ID}";
  var logSpreadSheet = SpreadsheetApp.openById(logSheetId);
  var log_sheet = logSpreadSheet.getSheetByName("서류 발급 내역");
  


  var trigger_id = "";
  var trigger_row;
  var signiture = "";
  /** E1:E 까지 중 완료 서명 없는 것 처리하기 */
  for(var i=2; i<trigger_lastRow+1; i++){
    /** E: trigger Task 완료 서명 */
    signiture = trigger_sheet.getRange("E"+String(i)).getValue();
    if(signiture === ""){
      Logger.log("빈서명 row: E" + String(i) + ", " + signiture);
      trigger_row = i;
      trigger_id = trigger_sheet.getRange("C"+String(i)).getValue()
      // trigger id
      trigger_sheet.getRange("F"+String(trigger_row)).setValue(trigger_id);
      break;
    }
  }
  
  if (trigger_id){
    // 트리거 데이터
    var scriptProperties  = PropertiesService.getScriptProperties().getProperty(trigger_id);

    if (scriptProperties !== null) {
      var SLACK_TOKEN = "{SLACK_TOKEN}";

      var latestTriggerData = JSON.parse(scriptProperties);
      if(latestTriggerData.trigger_type === "docs-download"){
        Logger.log(latestTriggerData);
        var selectedDocs = latestTriggerData.selectedDocs;
        var channel_id = latestTriggerData.channel_id;
        var container_message_ts = latestTriggerData.container_message_ts;
        var user_id = latestTriggerData.user_id;
        var downloadLink = zipAndDownloadFiles(selectedDocs, channel_id, user_id);
        
        Logger.log(downloadLink);
        // 로그 남기기 - 마지막 열 추적
        var log_sheet_lastRow = log_sheet.getLastRow();
        /** 로그: 시간 */
        log_sheet.getRange("A"+String(log_sheet_lastRow+1)).setValue(new Date());
        /** 부서명 */
        log_sheet.getRange("B"+String(log_sheet_lastRow+1)).setValue(downloadLink);
        /** 사용자ID */
        log_sheet.getRange("C"+String(log_sheet_lastRow+1)).setValue(SLACK_URI + "team/" + user_id);
        /** 서류명 */
        log_sheet.getRange("D"+String(log_sheet_lastRow+1)).setValue(JSON.stringify(selectedDocs));
        /** 비고: 엑세스 만료일 3일 */
        var today = new Date();
        var expire_date = new Date();
        expire_date.setDate(today.getDate()+3);
        
        log_sheet.getRange("E"+String(log_sheet_lastRow+1)).setValue("Expire Date: "+ lib.getFormattedDate(expire_date));

        // trigger 종료 로그
        /** D: 다운로드 파일 */
        trigger_sheet.getRange("I"+String(trigger_row)).setValue(downloadLink);
        
        trigger_sheet.getRange("J"+String(trigger_row)).setValue("Expire Date: "+ lib.getFormattedDate(expire_date));
        

        slack.updateMessage(
            channel_id,
            container_message_ts,
            ":mega: *`필요한 서류를 압축파일 전달드릴게요!!*\n\n:ok: <"+String(downloadLink)+"|서류 링크> 에서 확인할 수 있어요!\n- 요청하신 서류는, `" + JSON.stringify(selectedDocs) +"` 입니다.",
            SLACK_TOKEN
          );

      }

      /** D: trigger Task 완료 서명 */
      trigger_sheet.getRange("E"+String(trigger_row)).setValue(slack.generateUUID());
      PropertiesService.getUserProperties().deleteProperty(trigger_id);
      /** 트리거 삭제 */
      lib.deleteTriggers();
    }
  }
}

function zipAndDownloadFiles(selectedDocs) {
  // 찾을 파일 이름들
  var fileNames = selectedDocs;
  
  // 압축 파일 이름
  var zipFileName = "정량서류_"+ lib.getFormattedDate() + ".zip";;
  
  // 압축 파일을 찾을 폴더
  var folderName = "정량서류";
  // 압축 파일 저장 폴더
  var zipFodler = "임시_압축_다운로드";

  // 특정 폴더에서 파일 찾아 압축 파일 생성
  var zipFile = driveapp_api.createZipInFolder(fileNames, folderName, zipFodler, zipFileName);
  
  // 압축 파일 다운로드 링크 생성
  var downloadLink = zipFile.getDownloadUrl();
  
  // 다운로드 링크 출력
  Logger.log("다운로드 링크: " + downloadLink);
  return String(downloadLink);
}












