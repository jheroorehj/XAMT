import { DayData, UserProfile } from './types';

export const USER_PROFILES: UserProfile[] = [
  {
    id: 'parent_saraa',
    role: 'parent',
    nameMn: 'Ээж Сараа',
    nameKo: '엄마 Сараа',
    emoji: '🦌'
  },
  {
    id: 'child_temuulen',
    role: 'child',
    nameMn: 'Хүү Тэмүүлэн',
    nameKo: '자녀 Тэмүүлэн',
    emoji: '🐑'
  }
];

export const INITIAL_DAYS_DATA: Record<string, DayData> = {
  '2026-08-19': {
    date: '2026-08-19',
    isComplete: true,
    slots: {
      morning: {
        slot: 'morning',
        status: 'completed',
        parentMoment: {
          id: 'p_morn_0819',
          type: 'photo',
          mediaUrl: '/moments/morning-parent.png',
          timestamp: '07:15',
          authorRole: 'parent',
          authorNameMn: 'Ээж Сараа',
          authorNameKo: '엄마 Сараа',
          authorEmoji: '🦌'
        },
        childMoment: {
          id: 'c_morn_0819',
          type: 'photo',
          mediaUrl: '/moments/morning-child.png',
          timestamp: '07:30',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑'
        }
      },
      lunch: {
        slot: 'lunch',
        status: 'completed',
        parentMoment: {
          id: 'p_lunch_0819',
          type: 'video',
          mediaUrl: '/moments/lunch-parent.png',
          timestamp: '12:40',
          authorRole: 'parent',
          authorNameMn: 'Ээж Сараа',
          authorNameKo: '엄마 Сараа',
          authorEmoji: '🦌',
          duration: '0:08',
          syncState: 'pending'
        },
        childMoment: {
          id: 'c_lunch_0819',
          type: 'photo',
          mediaUrl: '/moments/lunch-child.png',
          timestamp: '12:50',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑'
        }
      },
      dinner: {
        slot: 'dinner',
        status: 'active',
        childMoment: {
          id: 'c_dinner_0819',
          type: 'video',
          mediaUrl: '/moments/dinner-child.png',
          timestamp: '20:10',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑',
          duration: '0:07'
        }
      }
    },
    sharedDiary: {
      date: '2026-08-19',
      titleMn: '2026 оны 8-р сарын 19-ний гэр бүлийн өдрийн тэмдэглэл',
      titleKo: '2026년 8월 19일 가족 공유 일기',
      contentMn: `Өглөө нар мандахад ээж нь хөдөө гэрийн өрхөө татан сүүтэй цайгаа чанаж, Тэмүүлэн дотуур байрандаа сэрж шинэ өдрийн хичээлдээ бэлдлээ. 

Өдөр нь ээж нь хонь малаа бэлчээрт гарган хариулж, хүү нь сургуулийн цайны газарт найзуудтайгаа хооллон хичээлээ сайн хийжээ. 

Орой наран жаргаж хөдөө талд мал хотлох үеэр, хүүгээсээ "Шалгалтаа сайн өгсөн, та хоёр минь дулаан хоноорой" гэсэн дуут мэнд ирэхэд сэтгэл уужирч тайван сайхан үдэш боллоо. Хол байгаа ч бидний нэг өдөр яг л хамт байгаа мэт дулаахан өнгөрлөө.`,
      contentKo: `새벽안개가 걷히고 해가 뜨자 엄마는 초원의 게르 문을 열어 따뜻한 수테차를 끓였고, 기숙사에 있는 테물렌도 부지런히 일어나 책상을 정리하고 아침 수업을 준비했다.

낮에는 엄마가 가축들을 이끌고 풀밭을 거니는 동안 아이는 학교 식당에서 친구들과 밥을 챙겨 먹으며 열심히 공부했다.

어스름한 저녁 노을이 초원을 물들이고 양들을 우리로 들일 무렵, 기숙사에서 "시험 잘 봤어요. 엄마 아빠 감기 조심하세요"라는 아이의 다정한 목소리가 도착했다. 몸은 멀리 떨어져 있어도 서로의 안부를 채워주며 같은 하루를 온전히 함께 보낸 포근한 날이었다.`
    },
    voiceLogs: [
      {
        id: 'voice_01',
        timeSlot: 'dinner',
        speakerRole: 'child',
        speakerNameMn: 'Хүү Тэмүүлэн 🐑',
        speakerNameKo: '자녀 Тэмүүлэн 🐑',
        userInputMn: 'Ээжээ, өнөөдөр математикийн шалгалтаа сайн өгсөн. Орой дотуур байрны хоол бас амттай байлаа. Хөдөө аав та хоёр даараагүй биз дээ?',
        userInputKo: '엄마, 오늘 수학 시험 잘 봤어요. 기숙사 저녁 밥도 맛있게 먹었어요. 초원에 아빠랑 엄마는 춥지 않으세요?',
        aiResponseVoiceMn: 'Ээж Сараагийн хоолой 🦌',
        aiResponseVoiceKo: '엄마 Сараа의 목소리 🦌',
        aiResponseMn: 'Хүү минь, шалгалтаа сайн өгсөнд баяртай байна. Хөдөө өнөөдөр налгар дулаан байлаа. Дотуур байрандаа дулаан хувцаслаад эрт амраарай, хайртай шүү.',
        aiResponseKo: '우리 아들, 시험 잘 봐서 대견하구나. 초원도 오늘 날씨가 참 포근했단다. 기숙사에서 따뜻하게 입고 일찍 자렴, 사랑한다.',
        audioDuration: '0:12',
        timestamp: '20:15'
      }
    ]
  },
  '2026-08-18': {
    date: '2026-08-18',
    isComplete: true,
    slots: {
      morning: {
        slot: 'morning',
        status: 'completed',
        parentMoment: {
          id: 'p_morn_0818',
          type: 'photo',
          mediaUrl: '/moments/morning-parent.png',
          timestamp: '06:50',
          authorRole: 'parent',
          authorNameMn: 'Ээж Сараа',
          authorNameKo: '엄마 Сараа',
          authorEmoji: '🦌'
        },
        childMoment: {
          id: 'c_morn_0818',
          type: 'photo',
          mediaUrl: '/moments/morning-child.png',
          timestamp: '07:40',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑'
        }
      },
      lunch: {
        slot: 'lunch',
        status: 'completed',
        parentMoment: {
          id: 'p_lunch_0818',
          type: 'photo',
          mediaUrl: '/moments/lunch-parent.png',
          timestamp: '13:00',
          authorRole: 'parent',
          authorNameMn: 'Ээж Сараа',
          authorNameKo: '엄마 Сараа',
          authorEmoji: '🦌'
        },
        childMoment: {
          id: 'c_lunch_0818',
          type: 'photo',
          mediaUrl: '/moments/lunch-child.png',
          timestamp: '13:15',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑'
        }
      },
      dinner: {
        slot: 'dinner',
        status: 'completed',
        parentMoment: {
          id: 'p_dinner_0818',
          type: 'photo',
          mediaUrl: '/moments/dinner-parent.png',
          timestamp: '21:00',
          authorRole: 'parent',
          authorNameMn: 'Ээж Сараа',
          authorNameKo: '엄마 Сараа',
          authorEmoji: '🦌'
        },
        childMoment: {
          id: 'c_dinner_0818',
          type: 'photo',
          mediaUrl: '/moments/dinner-child.png',
          timestamp: '21:30',
          authorRole: 'child',
          authorNameMn: 'Хүү Тэмүүлэн',
          authorNameKo: '자녀 Тэмүүлэн',
          authorEmoji: '🐑'
        }
      }
    },
    sharedDiary: {
      date: '2026-08-18',
      titleMn: '2026 оны 8-р сарын 18-ны гэр бүлийн өдрийн тэмдэглэл',
      titleKo: '2026년 8월 18일 가족 공유 일기',
      contentMn: `Өглөөний нар уулын оройг гийгүүлэхэд ээж нь хүүдээ сүүтэй цайгаа дээжлэн залбирч, Тэмүүлэн дотуур байрныхаа найзуудтай хичээлдээ явсан.

Өдөр нь ээж нь голын хөвөөнд малаа ундаалан сууж, хүү нь номын санд ном уншиж суугааг бодон сэтгэл дүүрэн байлаа.

Шөнө болоход хөдөө талд түмэн одод түгж, хүүгийн дотуур байранд ч намуун үдэш боллоо. Хол байгаа ч сэтгэл нэг өдөр байлаа.`,
      contentKo: `아침 햇살이 산등성이를 비출 때 엄마는 아이를 생각하며 따뜻한 수테차를 끓였고, 테물렌은 기숙사 친구들과 수업을 들으러 갔다.

낮에 시냇가에서 가축들에게 물을 먹이며, 아이가 도서관에서 책을 읽고 있을 모습을 떠올렸다.

밤이 깊어 초원에 무수한 별이 돋아나고, 아이의 기숙사 방에도 조용한 밤이 찾아왔다. 비록 떨어져 있어도 온 마음이 이어진 하루였다.`
    },
    voiceLogs: [
      {
        id: 'voice_02',
        timeSlot: 'dinner',
        speakerRole: 'parent',
        speakerNameMn: 'Ээж Сараа 🦌',
        speakerNameKo: '엄마 Сараа 🦌',
        userInputMn: 'Хүү минь, өнөөдөр голын хөвөөнд хонь малаа сайн ундааллаа. Дотуур байрандаа даарахгүй хичээлээ сайн хийж байна уу?',
        userInputKo: '아들아, 오늘 시냇가에서 양들에게 물을 잘 먹였단다. 기숙사에서 감기 걸리지 않고 공부 잘하고 있니?',
        aiResponseVoiceMn: 'Хүү Тэмүүлэнгийн хоолой 🐑',
        aiResponseVoiceKo: '자녀 Тэмүүлэн의 목소리 🐑',
        aiResponseMn: 'Ээжээ, би дотуур байрандаа дулаахан сайн байгаа. Сургуулиа сайн төгсөөд амралтаараа хурдан очиж тусална аа!',
        aiResponseKo: '엄마, 저 기숙사에서 따뜻하게 잘 지내고 있어요. 열심히 공부해서 방학 때 얼른 게르로 가서 도울게요!',
        audioDuration: '0:10',
        timestamp: '20:45'
      }
    ]
  }
};
