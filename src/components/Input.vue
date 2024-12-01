<template>
  <div class="container">
    <div class="header">
      <div class="back"></div>
      <img class="logo" src="@/assets/logo.png" alt="Logo" />
    </div>

    <div class="main-content">
      <h1>農家情報を入力する</h1>

      <section class="profile-info">
        <h2>個人情報</h2>
        <hr class="line" />
        <label>
          農家のアピール写真
          <div class="file-select">
            <input type="file" id="file-upload" @change="handleImageUpload" />
            <div class="file-button" :class="{ 'file-selected': isImageSelected }">
              {{ fileName }}
            </div>
            <span class="file-status">{{
              isImageSelected ? '選択済み' : '選択されていません'
            }}</span>
          </div>
        </label>
        <label>
          お名前
          <div class="input-box">
            <input
              type="text"
              v-model="name"
              placeholder="お名前を入力"
              :class="{ 'input-focused': name }"
            />
          </div>
        </label>
        <label>
          ご年齢
          <div class="input-box">
            <select v-model="age" :class="{ 'input-focused': age }">
              <option disabled value="">選択してください</option>
              <option v-for="n in [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]" :key="n" :value="n">
                {{ n }}代
              </option>
            </select>
          </div>
        </label>
      </section>

      <section class="help-info">
        <h2>お手伝い内容</h2>
        <hr class="line" />
        <label>
          お日にち
          <div class="input-box">
            <input type="date" v-model="date" />
          </div>
        </label>
        <label>
          開始時刻
          <div class="input-box">
            <input type="time" v-model="time" />
          </div>
        </label>
        <label>
          場所
          <div class="input-box">
            <select v-model="location" :class="{ 'input-focused': location }">
              <option disabled value="">選択してください</option>
              <optgroup label="あ行">
                <option>有田市</option>
                <option>有田川町</option>
                <option>印南町</option>
                <option>岩出市</option>
              </optgroup>
              <optgroup label="か行">
                <option>海南市</option>
                <option>かつらぎ町</option>
                <option>上富田町</option>
                <option>北山村</option>
                <option>紀の川市</option>
                <option>紀美野町</option>
                <option>串本町</option>
                <option>九度山町</option>
                <option>高野町</option>
                <option>古座川町</option>
                <option>御坊市</option>
              </optgroup>
              <optgroup label="さ行">
                <option>白浜町</option>
                <option>新宮市</option>
                <option>すさみ町</option>
              </optgroup>
              <optgroup label="た行">
                <option>太地町</option>
                <option>田辺市</option>
              </optgroup>
              <optgroup label="な行">
                <option>那智勝浦町</option>
              </optgroup>
              <optgroup label="は行">
                <option>橋本市</option>
                <option>日高町</option>
                <option>日高川町</option>
                <option>広川町</option>
              </optgroup>
              <optgroup label="ま行">
                <option>みなべ町</option>
                <option>美浜町</option>
              </optgroup>
              <optgroup label="や行">
                <option>湯浅町</option>
                <option>由良町</option>
              </optgroup>
              <optgroup label="わ行">
                <option>和歌山市</option>
              </optgroup>
            </select>
          </div>
        </label>
        <label>
          作業内容
          <div class="input-box">
            <textarea
              v-model="info"
              placeholder="作業内容を入力"
              :class="{ 'input-focused': info }"
            ></textarea>
          </div>
        </label>
      </section>

      <section class="give-info">
        <h2>提供できる情報</h2>
        <hr class="line" />
        <label>
          ノウハウ
          <div class="input-box">
            <select v-model="knowledge" :class="{ 'input-focused': knowledge }">
              <option disabled value="">選択してください</option>
              <option>害虫対策</option>
              <option>土づくり</option>
              <option>育て方</option>
            </select>
          </div>
        </label>
      </section>

      <button class="add-button" @click="addData">この内容で掲載</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Vue Router をインポート
import { db } from '@/firebase/init' // Firebase 初期化の db をインポート
import { collection, addDoc } from 'firebase/firestore' // Firestore にデータを追加するための関数をインポート

// Input fields
const name = ref('')
const age = ref('')
const date = ref('')
const time = ref('')
const location = ref('')
const info = ref('')
const knowledge = ref('')
const image = ref(defaultImage) // デフォルト画像としてdefaultImageをセット
const fileName = ref('ファイルの選択') // ファイル名を保持する変数

const isImageSelected = ref(false) // 画像選択の状態を管理する

const router = useRouter() // useRouter を使って router インスタンスを取得

// ここでdefaultImageをインポート
import defaultImage from '@/assets/default.png'

// 画像アップロード
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      image.value = reader.result
    }
    reader.readAsDataURL(file)
    fileName.value = file.name // 選択したファイルの名前をセット
    isImageSelected.value = true // 画像が選ばれた場合、選択済みとする
  } else {
    image.value = defaultImage // ファイルが選ばれなかった場合はデフォルト画像を設定
    fileName.value = 'ファイルの選択' // ファイルが選ばれなかった場合、テキストを戻す
    isImageSelected.value = false // 画像が選ばれなかった場合、選択されていない状態に戻す
  }
}

// ノウハウ画像ファイルのインポート
import natuyasaiImage from '@/assets/natuyasai.png'
import gaichuImage from '@/assets/gaichu.png'
import tuchiImage from '@/assets/tuchi.png'

// ノウハウ選択に応じた画像を返す関数
function getKnowledgeImage(knowledge) {
  if (knowledge === '害虫対策') {
    return gaichuImage
  } else if (knowledge === '土づくり') {
    return tuchiImage
  } else if (knowledge === '育て方') {
    return natuyasaiImage
  }
  return defaultImage
}

// データ追加関数
async function addData() {
  if (!name.value || !age.value || !date.value || !time.value || !location.value || !info.value) {
    alert('画像以外の項目は最低限必要です。')
    return
  }

  try {
    const docRef = await addDoc(collection(db, '農家情報'), {
      image: image.value || defaultImage,
      name: name.value,
      age: age.value,
      dateTime: `${date.value} ${time.value}`,
      location: location.value,
      info: info.value,
      knowledge: knowledge.value,
      knowledgeImage: getKnowledgeImage(knowledge.value),
    })

    console.log('Document written with ID: ', docRef.id)

    // 入力フィールドのリセット
    name.value = ''
    age.value = ''
    date.value = ''
    time.value = ''
    location.value = ''
    info.value = ''
    knowledge.value = ''
    image.value = ''

    // データが追加された後に出力ページへ遷移
    router.push({ name: 'OutputPage' }) // /OutputPageへ遷移
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
</script>

<style scoped>
/* 全体 */
.input-focused {
  color: black !important; /* フォーカス後の文字色を黒に */
}

.container {
  background: #fff0d3;
  overflow-x: hidden;
  display: flex;
  justify-content: center; /* 横方向の中央揃え */
  align-items: center; /* 縦方向の中央揃え */
  position: absolute; /* 必要に応じて絶対配置 */
  top: 0; /* 親要素のトップに配置 */
  left: 0; /* 親要素の左に配置 */
  width: 100%; /* 親要素の幅に合わせる */
  height: 100vh; /* ビューポートの高さに合わせる */
}

/* ヘッダー */
.header {
  width: 100%;
  height: 120px;
  position: absolute;
  position: fixed;
  top: 0;
  background: white;
  z-index: 10;
  display: flex; /* Flexboxを有効にする */
  justify-content: space-between; /* 両端に配置 */
  align-items: center; /* 垂直方向に中央揃え */
  padding: 0 20px; /* 両端のスペースを確保 */
}
.logo {
  width: 240px;
  height: 87.66px;
  position: absolute;
  left: 50%; /* 画面幅の50%位置に配置 */
  transform: translateX(-50%); /* ロゴの幅の半分だけ左に移動して中央揃えにする */
}

/* メイン */

.main-content {
  width: 370px;
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column; /* 要素を縦に並べる */
  align-items: center; /* 中央揃え（横方向） */
  justify-content: flex-start; /* 上に寄せる */
  padding-bottom: 20px; /* 下部に余白を追加 */
}

h1 {
  font-size: 24px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
  color: black;
  text-align: center;
  margin-top: 130px;
}

section {
  width: 370px;
  margin-top: 40px;
}

h2 {
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
  color: black;
  margin-bottom: 0px;
}

.line {
  width: 100%;
  border: 3px solid #72ab63;
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 20px;
  color: black;
}

/* 画像選択 */
.file-selected {
  color: black !important;
}

/* input[type="file"] を非表示にします */
#file-upload {
  display: none;
}

.file-status {
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0px;
}

.file-select {
  display: flex; /* 横並びにするためにflexboxを使用 */
  align-items: center; /* 垂直方向の中央揃え */
  gap: 10px; /* ボタンとステータス間の間隔 */
}

.file-select .file-button {
  display: inline-block;
  max-width: 200px;
  height: 40px;
  background: white;
  border: 1px solid black;
  padding: 6px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  cursor: pointer; /* ポインターカーソルを表示 */
}

.input-box select {
  width: 100%;
  max-width: 200px;
  height: 40px;
  background: white;
  border: 1px solid black;
  padding: 6px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  cursor: pointer; /* ポインターカーソルを表示 */
}

.input-box input,
.input-box textarea {
  width: 100%;
  max-width: 200px;
  height: 40px;
  background: white;
  border: 1px solid black;
  padding: 6px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  cursor: text; /* テキストカーソルを表示 */
}

/* テキストエリアのスタイル */
.input-box textarea {
  resize: none;
}

/* ボタン */
.add-button {
  width: 240px;
  height: 80px;
  background: #72ab63;
  color: white;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 24px;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
