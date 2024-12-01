<template>
  <div class="container">
    <!-- Header -->
    <div class="Header">
      <div class="Back"></div>
      <img class="logo" src="@/assets/logo.png" alt="Logo" />
    </div>

    <!---main -->
    <div class="main-content">
      <div class="title">農家さんを探す</div>

      <!-- データリストの出力 -->
      <div
        v-for="(data, index) in dataList"
        :key="data.id"
        :class="['Farmer', index % 2 === 0 ? 'left' : 'right', `row-${Math.floor(index / 2)}`]"
        @click="showDeleteButton(index)"
      >
        <div class="imageWrapper">
          <img :src="data.image || defaultImage" alt="画像" class="DefaultPng" />
        </div>
        <div class="farmerInfo">
          {{ data.name }}（{{ data.age }}代）
          <br />
          {{ formatDateTime(data.dateTime) }}～
          <br />
          {{ data.location }}
          <br />
          {{ data.info }}
        </div>
        <img :src="data.knowledgeImage" alt="ノウハウ画像" class="GaichuPng" />
        <div class="applyButton">応募する</div>

        <!-- 削除ボタンのオーバーレイ -->
        <div
          v-if="data.showDeleteButton"
          class="deleteOverlay"
          @click.self="hideDeleteButton(index)"
        >
          <!-- 中央の削除ボタン -->
          <div class="deleteButton" @click.stop="deleteFarmer(index)">削除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/init' // Firestore の初期化をインポート

// デフォルト画像のインポート
import defaultImage from '@/assets/default.png'

// Firestore から取得したデータを保持
const dataList = ref([])

// Firestore からデータを取得（リアルタイムリスニング）
function subscribeToFirestore() {
  const unsubscribe = onSnapshot(
    collection(db, '農家情報'), // '農家情報' はコレクション名
    (snapshot) => {
      dataList.value = snapshot.docs.map((doc) => ({
        id: doc.id, // ドキュメントの ID
        ...doc.data(), // Firestore ドキュメントのデータ
        showDeleteButton: false, // 削除ボタンの初期化
      }))
    },
    (error) => {
      console.error('Firestore リスニング中にエラーが発生しました:', error)
    },
  )
  return unsubscribe // 後でリスニング解除が必要な場合に使う
}

// コンポーネントのマウント時に Firestore をリスニング
onMounted(() => {
  subscribeToFirestore()
})

// 日付に関するフォーマット関数
function formatDateTime(dateTime) {
  const [date, time] = dateTime.split(' ') // '2024-11-23' と '10:00' に分割
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(new Date(date))
  return `${formattedDate} ${time}`
}

// 削除ボタン表示
function showDeleteButton(index) {
  dataList.value[index].showDeleteButton = !dataList.value[index].showDeleteButton
}

// 背景クリックで削除ボタン非表示
function hideDeleteButton(index) {
  dataList.value[index].showDeleteButton = false
}

// Firestore のドキュメントを削除
async function deleteFarmer(index) {
  try {
    const farmerId = dataList.value[index].id
    await deleteDoc(doc(db, '農家情報', farmerId)) // Firestore から該当データを削除
    console.log(`ドキュメント ${farmerId} が削除されました`)
  } catch (error) {
    console.error('Firestore データの削除中にエラーが発生しました:', error)
  }
}
</script>

<style scoped>
/* 全体 */
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
.Header {
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
  width: 390px;
  position: absolute;
  top: 20px;
}

.title {
  left: 111px;
  top: 140px;
  position: absolute;
  text-align: center;
  color: black;
  font-size: 24px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
}

.Farmer {
  position: relative;
  flex-direction: column;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 160px;
}

.Farmer.left {
  left: 17.5px;
}

.Farmer.right {
  left: 52.5px;
}

/* 行ごとの高さを設定 */
.row-0 {
  top: 215px;
}

.row-1 {
  top: 235px;
}

.row-2 {
  top: 917px;
}

/* 画像を囲むラッパー */
.imageWrapper {
  width: 160px;
  height: 120px;
  overflow: hidden;
  position: relative;
}

.DefaultPng {
  width: 100%;
  height: 100%;
  object-fit: cover; /* フィールドを完全に埋める */
}

.farmerInfo {
  text-align: center;
  color: black;
  font-size: 16px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 500;
}

.GaichuPng {
  width: 160px;
  height: 60px;
}

.applyButton {
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.4);
}

/* 削除ボタンのオーバーレイ */
.deleteOverlay {
  position: absolute;
  top: 100px;
  left: 30px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  cursor: pointer;
}

/* 削除ボタン */
.deleteButton {
  color: red;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  z-index: 20;
}
</style>
