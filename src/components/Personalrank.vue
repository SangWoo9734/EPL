<template>
    <div class="board-season flex mt-3 mb-3">
        <button @click="this.season = changeSeason(this.season - 1)">&lt;</button>
        <p>{{ this.season }} - {{this.season % 100 + 1}}</p>
        <button @click="this.season = changeSeason(this.season + 1)">&gt;</button>
    </div>

    <table class='board-personal'>
      <tr style="box">
          <th style="width:15%">순위</th>
          <th style="width:70%; text-align:left;">선수</th>
          <th style="width:15%">득점</th>
      </tr>
      <tr>
        <td class='board-personal-rs'>1</td>
        <td class='board-personal-info flex'>
            <img src="https://media.api-sports.io/football/teams/40.png" alt="">
            <img src="https://media.api-sports.io/football/players/306.png" alt="">
            <div>
                <p>모하메드 살라</p>
                <p>Liverpool</p>
            </div>
        </td>
        <td class='board-personal-rs'>15</td>
      </tr>
      <tr>
        <td>2</td>
        <td>
            <p>디오고 조타</p>
            <p>Liverpool</p>
        </td>
        <td>10</td>
      </tr>
      <tr>
        <td>3</td>
        <td>
            <p>제이미 바디</p>
            <p>Leicester City</p>
        </td>
        <td>9</td>
      </tr>
      <tr>
        <td>4</td>
        <td>
            <p>하피냐</p>
            <p>Leedz United</p>
        </td>
        <td>8</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
            <p>손흥민</p>
            <p>Tottenham Hotspur</p>
        </td>
        <td>7</td>
      </tr>
    </table>

    <!-- <table class='board-personal'>
      <tr>
          <th>순위</th>
          <th>선수</th>
          <th>도움</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
            <p>모하메드 살라</p>
            <p>Liverpool</p>
        </td>
        <td>15</td>
      </tr>
      <tr>
        <td>2</td>
        <td>
            <p>디오고 조타</p>
            <p>Liverpool</p>
        </td>
        <td>10</td>
      </tr>
      <tr>
        <td>3</td>
        <td>
            <p>제이미 바디</p>
            <p>Leicester City</p>
        </td>
        <td>9</td>
      </tr>
      <tr>
        <td>4</td>
        <td>
            <p>하피냐</p>
            <p>Leedz United</p>
        </td>
        <td>8</td>
      </tr>
      <tr>
        <td>1</td>
        <td>
            <p>손흥민</p>
            <p>Tottenham Hotspur</p>
        </td>
        <td>7</td>
      </tr>
    </table> -->



</template>

<script>
export default {
    name : 'personalrank',
    data() {
      return {
        data : [],
        season : 2021
      }
    },
}
</script>

<style>

.board-personal {
    width : 100%;
    float : left;
    font-size : 15px;
}

.board-personal-rs {
    width : 15%;
}

.board-personal-info {
    padding : 5px;
}

.board-personal-info div{
    width : 100%;
    padding : 5px 10px;
    text-align: left;
}
.board-personal-info img{
    border-radius: 50%;
    width : 45px;
    height : 45px;
    padding : 5px;
    margin-left : 5px;
}

</style>