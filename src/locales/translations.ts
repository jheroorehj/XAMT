import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;

  // Guide Toggle
  guideToggleLabel: string;
  guideContent: string;

  // Navigation
  navHome: string;
  navHamtTimeline: string;
  navCalendarDiary: string;
  navVoice: string;

  // Home CTA & Slot Status
  homePrimaryRecordBtn: string;
  homeSlotActive: string;
  homeSlotCompleted: string;
  homeSlotUpcoming: string;
  homeSlotMissed: string;
  homeSlotMissedUpload: string;

  // Time Slots
  slotMorning: string;
  slotMorningTime: string;
  slotLunch: string;
  slotLunchTime: string;
  slotDinner: string;
  slotDinnerTime: string;

  // Capture Modal
  captureModalTitle: string;
  takeLandscapePhoto: string;
  recordLandscapeVideo: string;
  uploadMedia: string;
  landscapeHint: string;
  saveRecord: string;
  retake: string;
  sampleMediaLabel: string;
  myFileUploadLabel: string;

  // ХАМТ Timeline
  timelineTitle: string;
  parentLabel: string;
  childLabel: string;
  noRecordYet: string;
  addRecord: string;

  // Calendar & Real Diary
  calendarTitle: string;
  diaryTitle: string;

  // AI Voice
  aiVoiceTitle: string;
  aiVoiceSubtitle: string;
  aiVoiceRoleSelect: string;
  aiVoiceListening: string;
  aiVoiceSpeakPrompt: string;
  aiVoiceProcessing: string;
  aiVoiceStopBtn: string;
  aiVoiceCloseBtn: string;
  aiVoiceSaveToDiaryBtn: string;
  aiVoiceSavedNotice: string;
  aiVoiceSamplePrompt: string;

  // User & Roles (Consistent naming)
  userParent: string;
  userChild: string;
  parentName: string;
  childName: string;
}

export const translations: Record<Language, Translations> = {
  mn: {
    appName: 'ХАМТ',
    appSubtitle: 'Хол байсан ч, өдрийг хамтдаа',

    guideToggleLabel: 'Ашиглах заавар',
    guideContent: 'Өглөө, өдөр, орой тус бүр нэг удаа тэмдэглэнэ. Цаг хоцорсон тохиолдолд зураг эсвэл богино бичлэг нөхөж оруулах боломжтой.',

    navHome: 'Нүүр',
    navHamtTimeline: 'ХАМТ',
    navCalendarDiary: 'Өдрийн тэмдэглэл',
    navVoice: 'Дуут яриа',

    homePrimaryRecordBtn: 'Агшин бүртгэх',
    homeSlotActive: 'Одоогийн цаг',
    homeSlotCompleted: 'Бүртгэсэн',
    homeSlotUpcoming: 'Хүлээгдэж буй',
    homeSlotMissed: 'Хоцорсон',
    homeSlotMissedUpload: 'Оруулах',

    slotMorning: 'Өглөө',
    slotMorningTime: '07:15',
    slotLunch: 'Өдөр',
    slotLunchTime: '12:40',
    slotDinner: 'Орой',
    slotDinnerTime: '19:20',

    captureModalTitle: 'Агшин үлдээх',
    takeLandscapePhoto: 'Хэвтээ зураг авах',
    recordLandscapeVideo: 'Богино бичлэг хийх',
    uploadMedia: 'Файл оруулах',
    landscapeHint: 'Хэвтээ (16:9) хэлбэр',
    saveRecord: 'Хадгалах',
    retake: 'Дахин авах',
    sampleMediaLabel: 'Агшин сонгох',
    myFileUploadLabel: 'Файл сонгох',

    timelineTitle: 'ХАМТ',
    parentLabel: 'Ээж Сараа 🦌',
    childLabel: 'Хүү Тэмүүлэн 🐑',
    noRecordYet: 'Бичлэг хараахан алга',
    addRecord: 'Бичлэг нэмэх',

    calendarTitle: 'Хуанли',
    diaryTitle: 'Гэр бүлийн өдрийн тэмдэглэл',

    aiVoiceTitle: 'Дуут яриа',
    aiVoiceSubtitle: 'Гэр бүлийн хоолойгоор хариу сонсож, өдрийн тэмдэглэлдээ нэгтгэнэ',
    aiVoiceRoleSelect: 'Яригч',
    aiVoiceListening: 'Сонсож байна...',
    aiVoiceSpeakPrompt: 'Микрофон дээр дарж өдрийн сонин, бодлоо ярина уу',
    aiVoiceProcessing: 'Хариу бэлтгэж байна...',
    aiVoiceStopBtn: 'Дуусгах',
    aiVoiceCloseBtn: 'Хаах',
    aiVoiceSaveToDiaryBtn: 'Тэмдэглэлд оруулах',
    aiVoiceSavedNotice: 'Өдрийн тэмдэглэлд нэгтгэлээ',
    aiVoiceSamplePrompt: '"Ээжээ, өнөөдөр хичээл тараад дотуур байрандаа ирлээ. Хөдөө мал сүрэг сайн уу?"',

    userParent: 'Эцэг эх (Хөдөө тал)',
    userChild: 'Хүүхэд (Дотуур байр)',
    parentName: 'Ээж Сараа',
    childName: 'Хүү Тэмүүлэн'
  },
  ko: {
    appName: 'ХАМТ',
    appSubtitle: '멀리 있어도, 하루는 함께',

    guideToggleLabel: '이용 방법',
    guideContent: '아침·점심·저녁에 한 번씩 기록합니다. 시간을 놓치면 사진 또는 짧은 영상을 업로드할 수 있습니다.',

    navHome: '홈',
    navHamtTimeline: 'ХАМТ',
    navCalendarDiary: '공유일기',
    navVoice: '음성 기록',

    homePrimaryRecordBtn: '순간 기록하기',
    homeSlotActive: '지금 기록 가능',
    homeSlotCompleted: '기록 완료',
    homeSlotUpcoming: '예정',
    homeSlotMissed: '놓친 시간',
    homeSlotMissedUpload: '업로드',

    slotMorning: '아침',
    slotMorningTime: '07:15',
    slotLunch: '점심',
    slotLunchTime: '12:40',
    slotDinner: '저녁',
    slotDinnerTime: '19:20',

    captureModalTitle: '순간 남기기',
    takeLandscapePhoto: '가로 사진 촬영',
    recordLandscapeVideo: '가로 영상 촬영',
    uploadMedia: '업로드',
    landscapeHint: '가로(16:9)',
    saveRecord: '저장하기',
    retake: '다시 찍기',
    sampleMediaLabel: '샘플 사진 선택',
    myFileUploadLabel: '내 파일 업로드',

    timelineTitle: 'ХАМТ',
    parentLabel: '엄마 Сараа 🦌',
    childLabel: '자녀 Тэмүүлэн 🐑',
    noRecordYet: '기록 대기 중',
    addRecord: '기록 추가',

    calendarTitle: '캘린더',
    diaryTitle: '가족 공유일기',

    aiVoiceTitle: '일상 음성 기록',
    aiVoiceSubtitle: '가족의 목소리로 답장을 듣고 일기에 반영합니다',
    aiVoiceRoleSelect: '말하는 사람',
    aiVoiceListening: '듣고 있어요...',
    aiVoiceSpeakPrompt: '마이크를 눌러 오늘 하루 있었던 일을 편하게 말해보세요',
    aiVoiceProcessing: '가족 목소리 답장 생성 중...',
    aiVoiceStopBtn: '말씀 완료',
    aiVoiceCloseBtn: '닫기',
    aiVoiceSaveToDiaryBtn: '공유일기에 반영하기',
    aiVoiceSavedNotice: '공유일기에 반영 완료되었습니다',
    aiVoiceSamplePrompt: '"엄마, 오늘 수업 끝나고 기숙사 들어왔어요. 초원에 가축들은 잘 있나요?"',

    userParent: '부모 (초원 유목)',
    userChild: '자녀 (기숙학교)',
    parentName: '엄마 Сараа',
    childName: '자녀 Тэмүүлэн'
  }
};
