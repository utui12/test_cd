<template>
  <div>
    <h1>体脂率计算器</h1>
    <form>
      <label>
        身高（厘米）：
        <input type="number" v-model="height">
      </label>
      <label>
        体重（千克）：
        <input type="number" v-model="weight">
      </label>
      <label>
        腰围（厘米）：
        <input type="number" v-model="waist">
      </label>
      <button type="button" @click="calculate">计算</button>
    </form>
    <div v-if="result" class="result">
      <p>您的体脂率为 {{ result }}%。</p>
      <p>健康范围为 {{ healthyRange.start }}% 至 {{ healthyRange.end }}%。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,
      weight: null,
      waist: null,
      result: null,
      healthyRange: null
    };
  },
  methods: {
    calculate() {
      const heightInM = this.height / 100;
      const bmi = this.weight / Math.pow(heightInM, 2);
      const a = this.waist * 0.74;
      const b = this.weight * 0.082 + 34.89
      const c = a - b
      const result = c / this.weight
      const age = 25; // 假设年龄为25岁
      const gender = 0.5; // 假设为女性
      const normalBFRanges = {
        female: { start: 20, end: 30 },
        male: { start: 10, end: 20 }
      };
      const healthyRange = normalBFRanges[gender === 0 ? 'female' : 'male'];
      this.result = result;
      this.healthyRange = healthyRange;
    }
  }
};
</script>
