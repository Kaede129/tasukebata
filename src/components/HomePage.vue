<template>
  <div class="container">
    <!--ヘッダー-->
    <div class="header">
      <div class="back"></div>
      <img class="logo" src="@/assets/logo.png" alt="Logo" />
    </div>

    <!--メイン-->
    <div class="main-content">
      <div class="nayami">
        <div class="nayami-text">
          菜園愛好家のあなた！<br />
          こんなお悩みありませんか？
        </div>
        <img class="nayami1" src="@/assets/nayami1.png" alt="Nayami 1" />
        <div class="nayami-caption nayami1-caption">成長不良</div>
        <img class="nayami2" src="@/assets/nayami2.png" alt="Nayami 2" />
        <div class="nayami-caption nayami2-caption">害虫被害</div>
      </div>
      <div class="shake">
        <div class="shake-text">
          <span>「たすけ畑」は<br />人手不足に困る農家さんと<br />菜園愛好家を繋ぐ</span>
          <span class="highlight">協力支援アプリ</span>
        </div>
        <img class="shakehand" src="@/assets/shakehand.png" alt="Shake Hand" />
      </div>
      <div class="info-explanation">
        <div class="info-text">農家さんのお手伝いをし<br />お悩みを相談することができます！</div>
        <div class="info-detail">
          <span>農家さんのお手伝いをする代わりに<br />農家さんだからこそ知る<br />家庭菜園の</span>
          <span class="highlight">コツ</span>
          <span>や育て方の</span>
          <span class="highlight">秘訣</span>
          <span>を<br />直接学ぶことができます。</span>
        </div>
        <img class="yaritori" src="@/assets/yaritori.png" alt="Yaritori" />
      </div>
      <div class="farmerinput">
        <router-link to="/InputPage">
          <div class="input-link">農家さんはこちら</div>
        </router-link>
        <img class="farmer-input" src="@/assets/inputpage.png" alt="InputPage" />
      </div>
      <div class="steps">
        <div class="step step1">
          <div class="step-header">STEP 1</div>
          <div class="step-text">
            下記のリンクから<br />お手伝いする農家さんを選び
            <span class="highlight">応募</span>
          </div>
          <router-link to="/OutputPage">
            <div class="step-link">農家さんを探す</div>
          </router-link>
          <div class="example">
            <div class="example-caption">(例)</div>
            <img class="example-img" src="@/assets/default.png" alt="Example" />
            <div class="example-detail">
              山田 太郎（50代）<br />
              7/2(日) 10:00～<br />
              紀の川市<br />
              夏野菜の収穫
            </div>
            <img class="gaichu" src="@/assets/gaichu.png" alt="Gaichu" />
          </div>
        </div>
        <div class="step step2">
          <div class="step-header">STEP 2</div>
          <div class="step-text">
            応募した農家さんの
            <span class="highlight">お手伝い</span>
            に行く
          </div>
        </div>
        <div class="step step3">
          <div class="step-header">STEP 3</div>
          <div class="step-text">
            後日、働きぶりに応じた
            <span class="highlight">ノウハウ</span>
            を<br />
            農家さんに教えてもらう<br />
            <span class="note">(アプリ内のやり取りでも可)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
/* コンテナ全体のスタイル */
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
  width: 390px;
  position: absolute;
  top: 0;
}

/* 悩みセクション */
.nayami {
  width: 342px;
  height: 271px;
  position: absolute;
  left: 24px;
  top: 160px;
}
.nayami-text {
  position: absolute;
  top: 0;
  left: 41px;
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
}
.nayami1,
.nayami2 {
  position: absolute;
  width: 160px;
  height: 160px;
  top: 78px;
}
.nayami1 {
  left: 0;
}
.nayami2 {
  left: 182px;
}
.nayami-caption {
  position: absolute;
  text-align: center;
  color: black;
  font-size: 16px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 500;
}
.nayami1-caption {
  top: 248px;
  left: 56px;
}
.nayami2-caption {
  top: 248px;
  left: 230px;
}

/* 協力セクション */
.shake {
  width: 360px;
  height: 257px;
  position: absolute;
  top: 471px;
  left: 15px;
}
.shake-text {
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
}
.shake-text .highlight {
  color: #72ab63;
  font-weight: 700;
}
.shakehand {
  position: absolute;
  width: 300px;
  height: 150px;
  top: 107px;
  left: 30px;
}

/* 説明セクション */
.info-explanation {
  position: absolute;
  top: 768px;
  left: 15px;
  width: 360px;
}
.info-text {
  position: absolute;
  top: 0;
  left: 20px;
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
}
.info-detail {
  position: absolute;
  top: 78px;
  left: 52px;
  text-align: center;
  font-family: 'Zen Maru Gothic', sans-serif;
  color: black;
}
.info-detail .highlight {
  color: #72ab63;
  font-weight: 700;
}
.yaritori {
  position: absolute;
  top: 180px;
  width: 360px;
}

.input-link {
  top: 1163px;
  left: 115px;
  position: absolute;
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-family: 'Zen Maru Gothic', sans-serif;
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.4);
  cursor: pointer; /* リンクにポインターカーソルを適用 */
}

.farmer-input {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 135px;
  top: 1202px;
}

/* ステップセクション */
.steps {
  width: 304px;
  height: 797px;
  position: absolute;
  left: 43px;
  top: 1362px;
}
.step-header {
  background: #72ab63;
  border-radius: 50px;
  color: white;
  font-size: 20px;
  font-family: 'Zen Maru Gothic', sans-serif;
  font-weight: 700;
  width: 160px;
  height: 50px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step-text {
  margin-top: 20px;
  color: black;
  font-size: 16px;
  font-family: 'Zen Maru Gothic', sans-serif;
  text-align: center;
}
.step-text .highlight {
  color: #72ab63;
  font-size: 18px;
  font-weight: 700;
}
.step-link {
  margin-top: 0px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-family: 'Zen Maru Gothic', sans-serif;
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  cursor: pointer; /* リンクにポインターカーソルを適用 */
}
.example {
  margin-top: 0px;
  text-align: center; /* サンプルを中央揃え */
}
.example-caption {
  color: black;
  font-size: 14px;
  font-family: 'Zen Maru Gothic', sans-serif;
  margin-bottom: 10px;
}
.example-img {
  width: 120px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}
.example-detail {
  color: black;
  font-size: 14px;
  font-family: 'Zen Maru Gothic', sans-serif;
}
.gaichu {
  width: 160px;
  height: 60px;
  margin-top: 10px;
}
.note {
  font-size: 14px;
  color: black;
  text-align: center;
}
</style>
