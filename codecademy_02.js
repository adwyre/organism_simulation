// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Simulated organism
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Returns dna with one mutated base
    mutate() {
      let randIndex = Math.floor(Math.random() * 15);
      let randBase = this.dna[randIndex];
      let mutdBase = returnRandBase();
      while (mutdBase === randBase){
        mutdBase = returnRandBase();
      }
      let currIndex = 0;
      return this.dna.map(base => {
        if (currIndex === randIndex){
          currIndex ++;
          return mutdBase;
        } else {
          currIndex ++;
          return base;
        }
      });
    },
    // Compares dna of one organism to another. Returns % of dna in common.
    compareDNA(pAequor) {
      let sameCount = 0;
      for (let i = 0; i < 15; i++){
        if (this.dna[i] === pAequor.dna[i]){
          sameCount ++;
        }
        continue;
      }
      let percent = Math.floor((sameCount / 15) * 100);
      return console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percent}% DNA in common`);
    },
    // Returns if likely to survive based on % of 'C' and 'G' in dna
    willLikelySurvive() {
      let cgCount = 0;
      for (base of this.dna) {
        if (base === 'C' || base === 'G') {
          cgCount++;
        }
        continue;
      }
      if ((Math.floor((cgCount / 15) * 100)) >= 60) {
        return true;
      } else {
        return false;
      }
    }
  }
}
// Create an array of 30 organisms that are likely to survive
let survivors = [];
let specNum = 0001;
while (survivors.length < 30){
  let organism = pAequorFactory(specNum, mockUpStrand());
  if (organism.willLikelySurvive()){
    survivors.push(organism);
  }
  specNum ++;
}
