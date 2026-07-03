import { CHORD_LIBRARY } from './chords.mjs';
// Open tension chord forms (딩기리닷컴 lesson): keep strings 1 & 2 open (E, B)
// and slide the fretted shape along the neck. Works best in the keys of E and A.
export const TENSION_FORMS = [
    {
        formName: 'Form 1 · E Shape',
        formKr: '제1폼: E 코드 기반 폼',
        description: 'Start from the open E chord and slide the whole grip up while strings 1-2 keep ringing. Each stop lands on a chord you can use instead of the plain one: F → Fmaj7(#11), F# → F#7(add11), G → G6, A → Aadd9, B → Badd11, C → Cmaj7, D → D6/9.',
        chords: [
            CHORD_LIBRARY['E Major'],
            CHORD_LIBRARY['Fmaj7#11 (Form 1)'],
            CHORD_LIBRARY['F#7add11 (Form 1)'],
            CHORD_LIBRARY['G6 (Form 1)'],
            CHORD_LIBRARY['Aadd9 (Form 1)'],
            CHORD_LIBRARY['Badd11 (High Drone)'],
            CHORD_LIBRARY['Cmaj7 (Form 1)'],
            CHORD_LIBRARY['D6/9 (Form 1)'],
        ],
    },
    {
        formName: 'Form 2 · Asus2 Shape',
        formKr: '제2폼: Asus2 (A2) 기반 폼',
        description: 'Asus2 with the bass on the 5th string. Slide up two frets for Bsus4, three for Cmaj7, one more for the moody C#m7, then Dsus2 territory and on up to F#m11 and G6 at the high frets.',
        chords: [
            CHORD_LIBRARY['A 2'],
            CHORD_LIBRARY['B sus4 (Open)'],
            CHORD_LIBRARY['Cmaj7 (Form 2)'],
            CHORD_LIBRARY['C# Minor 7'],
            CHORD_LIBRARY['D6sus2 (Form 2)'],
            CHORD_LIBRARY['F#m11 (High Drone)'],
            CHORD_LIBRARY['G6 (Form 2)'],
        ],
    },
    {
        formName: 'Form 3 · F#m7(add11) Shape',
        formKr: '제3폼: F#m7 (add 11) 기반 폼',
        description: 'The minor-family form: mute the 5th string and move root + b7 + b3 under the open strings. Some stops omit the 5th entirely — the open-string nuance still carries the sound. Watch the b9 rub on D#m7.',
        chords: [
            CHORD_LIBRARY['F# Minor 7 (Open)'],
            CHORD_LIBRARY['G#m7b13 (Form 3)'],
            CHORD_LIBRARY['Am9 (Form 3)'],
            CHORD_LIBRARY['Bm11 (High Drone)'],
            CHORD_LIBRARY['C#m7 (Form 3)'],
            CHORD_LIBRARY['D#m7 (Form 3)'],
            CHORD_LIBRARY['Em7 (Form 3)'],
        ],
    },
    {
        formName: 'Form 4 · C#m7 High Position',
        formKr: '제4폼: C#m7 하이 포지션 폼',
        description: 'The fuller four-finger minor grip, at home around the 9th fret (C#m7) and slid down for Bm and Am, or walked F#m → G#m → Am for horizontal motion across the board.',
        chords: [
            CHORD_LIBRARY['F# m11 (Open)'],
            CHORD_LIBRARY['G#m b13 (Form 4)'],
            CHORD_LIBRARY['Am add9 (Form 4)'],
            CHORD_LIBRARY['Bm add11 (Form 4)'],
            CHORD_LIBRARY['C#m7 (Form 4)'],
        ],
    },
    {
        formName: 'Form 5 · Slash Chords (A/C#)',
        formKr: '제5폼: 분수 코드 폼 (A/C# 계열)',
        description: 'First-inversion slash voicings for sophisticated bass motion: A(add9)/C# → Bsus4/D# → Cmaj7/E → D6/9/F# → E/G#. The classic E-key ascending bass line, fully harmonized.',
        chords: [
            CHORD_LIBRARY['Aadd9/C# (Form 5)'],
            CHORD_LIBRARY['Bsus4/D# (Form 5)'],
            CHORD_LIBRARY['Cmaj7/E (Form 5)'],
            CHORD_LIBRARY['D6/9/F# (Form 5)'],
            CHORD_LIBRARY['E/G# (Form 5)'],
        ],
    },
    {
        formName: 'Form 6 · E/G# Variation',
        formKr: '제6폼: E/G# 변형 폼',
        description: 'A compact slash form with the bass on the 6th string. Climb it in half/whole steps for tension — F/A → F#/A# → G/B — and keep D/F# handy for descending runs.',
        chords: [
            CHORD_LIBRARY['E/G#'],
            CHORD_LIBRARY['Fmaj7#11/A (Form 6)'],
            CHORD_LIBRARY['F#7add11/A# (Form 6)'],
            CHORD_LIBRARY['G6/B (Form 6)'],
            CHORD_LIBRARY['D6/9/F# (Form 6)'],
        ],
    },
    {
        formName: 'Form 7 · G6/B Walk',
        formKr: '제7폼: G6/B 및 기타 변형 폼',
        description: "The lecturer's signature walk: a one-finger G6/B, then the Form-5 grips carry the bass and tensions up together — G6/B → A/C# → Bsus4/D# → C/E — resolving home on E/G#.",
        chords: [
            CHORD_LIBRARY['G6/B (Form 7)'],
            CHORD_LIBRARY['Aadd9/C# (Form 5)'],
            CHORD_LIBRARY['Bsus4/D# (Form 5)'],
            CHORD_LIBRARY['Cmaj7/E (Form 5)'],
            CHORD_LIBRARY['E/G# (Form 5)'],
        ],
    },
];
// 학습 확인 퀴즈 — from the source study guide.
export const TENSION_QUIZ = [
    {
        question: 'E 키와 A 키에서 오픈 텐션 코드를 사용할 때, 주로 어떤 줄을 개방현으로 유지합니까?',
        answer: '주로 1번 줄과 2번 줄을 개방현으로 사용합니다. 이는 코드에 고정된 텐션감을 부여하여 입체적인 사운드를 만듭니다.',
    },
    {
        question: '제1폼에서 F 코드 위치를 잡고 1, 2번 줄을 개방하면 어떤 코드가 형성됩니까?',
        answer: 'Fmaj7 (add #11) 코드가 됩니다. 일반적인 F 코드가 나올 자리에 편곡된 버전으로 사용할 수 있습니다.',
    },
    {
        question: '복잡한 코드 네임을 모두 외워야 합니까? 그 이유는 무엇입니까?',
        answer: '굳이 모두 외울 필요는 없습니다. 원래의 기본 코드(예: F, F#) 대신 사용할 수 있다는 점을 기억하고 활용하는 것이 더 중요합니다.',
    },
    {
        question: 'Asus2 폼(제2폼)에서 두 칸 이동하여 연주하면 어떤 코드가 됩니까?',
        answer: 'Bsus 계열 코드가 됩니다. 동일한 폼을 유지한 채 프렛 위치만 이동하여 연주가 가능합니다.',
    },
    {
        question: 'F#m7 (add 11) 폼을 이동하여 연주할 때, 일부 코드에서 공통적으로 생략되는 음은 무엇입니까?',
        answer: '5도음이 주로 생략됩니다. 5도음이 없어도 오픈 텐션 코드 특유의 뉘앙스는 충분히 살아 있습니다.',
    },
    {
        question: '분수 코드 A/C# 폼에서 두 칸 이동했을 때 만들어지는 코드의 이름은 무엇입니까?',
        answer: 'Bsus4/D# 코드가 됩니다. 베이스 음이 이동함에 따라 코드의 성격이 변하는 분수 코드의 형태입니다.',
    },
    {
        question: '오픈 텐션 코드가 일반적인 코드에 비해 가지는 사운드 측면의 장점은 무엇입니까?',
        answer: '훨씬 풍부하고 입체감 있는 사운드를 낼 수 있습니다. 개방현의 지속적인 울림이 코드 진행에 깊이를 더합니다.',
    },
    {
        question: "강의자가 추천하는 '음악적 고정관념을 벗어나는 방법'은 무엇입니까?",
        answer: '화성학 이론이나 고정관념을 잠시 내려놓고, 지판 위 폼 이동과 소리의 어울림을 자유롭게 시도해 보는 것입니다.',
    },
    {
        question: 'E/G# 코드를 대체하여 사용할 수 있는 하행 진행용 코드는 무엇입니까?',
        answer: 'D/F# (또는 D6/9/F#) 코드입니다. 베이스 러닝을 포함한 하행 코드 진행에서 유용합니다.',
    },
    {
        question: '이 7가지 코드 폼은 반드시 E 키나 A 키에서만 사용해야 합니까?',
        answer: '아닙니다. 주로 E, A 키에서 쓰이지만 앞뒤 코드와 잘 어울린다면 다른 키에서도 자유롭게 활용할 수 있습니다.',
    },
];
// 핵심 용어 사전
export const TENSION_GLOSSARY = [
    { term: '오픈 코드 (Open Chord)', definition: '지판을 누르지 않은 개방현을 포함하여 연주하는 코드.' },
    { term: '텐션 (Tension)', definition: '기본 3화음·7화음 이외의 음(9, 11, 13도 등)을 더해 긴장감과 색채감을 주는 음.' },
    { term: '개방현 (Open String)', definition: '왼손으로 지판을 누르지 않고 줄 본연의 소리를 내는 상태.' },
    { term: '분수 코드 (Slash Chord)', definition: "'A/C#'처럼 기본음이 아닌 다른 음을 베이스로 지정한 코드." },
    { term: '폼 (Form)', definition: '지판 위에서 코드를 잡는 손가락의 모양이나 형태.' },
    { term: '전위 (Inversion)', definition: '구성음의 위치를 바꾸어 베이스 음을 변경하는 것 (예: A 코드에서 C# 베이스).' },
    { term: '부협화음 (Dissonance)', definition: '동시에 울리는 음들이 충돌하는 느낌을 주는 화음 — 특정 위치 이동 시 주의.' },
    { term: 'add9 / add11', definition: '코드에 9도음 또는 11도음을 단순히 추가했다는 표기법.' },
];
