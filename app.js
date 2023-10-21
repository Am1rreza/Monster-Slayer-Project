function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },

    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },

    mayUseHeal() {
      return this.currentRound % 2 !== 0;
    },
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth -= attackValue;
    },

    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(25, 10);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
