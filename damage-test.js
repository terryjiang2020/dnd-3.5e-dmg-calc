const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let bab = 0;
let str = 10;
let dex = 10;
let wpnEnhancement = 0;
let additionalAB = 0;
let additionalDMG = 0;
let additionalABOff = 0;
let additionalDMGOff = 0;
let enemyDR = 0;

let wpndmg = 0;
let offhandWpndmg = 0;
let twoHandedWpndmg = 0;
let strAdj = 0;
let dexAdj = 0;
let targetedAC = 0;

readline.question('Enter your BAB, STR, DEX, Wpn Enhancement, Enemy DR, other additional AB, other additional DMG, other additional AB (offhand), other additional DMG (offhand), and targeted AC (0 means all) divide by comma: ', 
    input => {
        console.log(`You entered: ${input}!`);
        const inputArray = input.replace(/ /g, '').split(',');
        if (inputArray.length < 3) {
            console.log('Input invalid.');
            throw 403;
        }
        else {
            bab = parseInt(inputArray[0]);
            str = parseInt(inputArray[1]);
            dex = parseInt(inputArray[2]);
            if (inputArray.length > 3) {
                wpnEnhancement = parseInt(inputArray[3]);
            }
            if (inputArray.length > 4) {
                enemyDR = parseInt(inputArray[4]);
            }
            if (inputArray.length > 5) {
                additionalAB = parseInt(inputArray[5]);
            }
            if (inputArray.length > 6) {
                additionalDMG = parseInt(inputArray[6]);
            }
            if (inputArray.length > 7) {
                additionalABOff = parseInt(inputArray[7]);
            }
            if (inputArray.length > 8) {
                additionalDMGOff = parseInt(inputArray[8]);
            }
            if (inputArray.length > 9) {
                targetedAC = parseInt(inputArray[9]);
            }
        }
        mainProcess();
        readline.close();
    }
);
        
const singleHitRateStrArray = [];
const singleHitRateStrTwoHandedArray = [];
const singleHitRateDexArray = [];

const totalHitRateStrArray = [];
const totalHitRateStrTwoHandedArray = [];
const totalHitRateStrTWFArray = [];
const totalHitRateStrTWFMainArray = [];
const totalHitRateStrTWFOffArray = [];
const totalHitRateDexArray = [];
const totalHitRateDexRapidShotArray = [];
const totalHitRateDexManyshot2Array = [];
const totalHitRateDexManyshot3Array = [];
const totalHitRateDexManyshot4Array = [];
const totalHitRateDexTWFArray = [];
const totalHitRateDexTWFMainArray = [];
const totalHitRateDexTWFOffArray = [];

const dmgSingleStrArray = [];
const dmgFullStrArray = [];
const dmgSingleStrTwoHandedArray = [];
const dmgFullStrTwoHandedArray = [];
const dmgFullStrTWFArray = [];
const dmgFullStrTWFDSArray = [];
const dmgFullStrTWFRendArray = [];
const dmgFullStrTWFSingleArray = [];
const dmgFullStrTWFSingleRendArray = [];
const dmgSingleDexArray = [];
const dmgFullDexArray = [];
const dmgDexRapidShotArray = [];
const dmgDexManyshot2Array = [];
const dmgDexManyshot3Array = [];
const dmgDexManyshot4Array = [];
const dmgFullDexTWFArray = [];
const dmgFullDexTWFSingleArray = [];
const dmgFullDexTWFDSArray = [];
const dmgSingleDexTwoHandedArray = [];
const dmgFullDexTwoHandedArray = [];

function calculateEstimateddmg(ac, powerAttack) {
    console.log('Current AC: ', ac);
    console.log('Current Power Attack: ', powerAttack);

    if (!powerAttack) {
        powerAttack = 0;
    }
    
    let singleHitRateStr = 0;
    let singleHitRateStrTwoHanded = 0;
    let singleHitRateDex = 0;

    let totalHitRateStr = 0;
    let totalHitRateStrTwoHanded = 0;
    let totalHitRateStrTWF = 0;
    let totalHitRateStrTWFMain = 0;
    let allMissChanceStrTWFMain = 1;
    let totalHitRateStrTWFOff = 0;
    let allMissChanceStrTWFOff = 1;
    let totalHitRateDex = 0;
    let totalHitRateDexRapidShot = 0;
    let totalHitRateDexManyshot2 = 0;
    let totalHitRateDexManyshot3 = 0;
    let totalHitRateDexManyshot4 = 0;
    let totalHitRateDexTWF = 0;
    let totalHitRateDexTWFMain = 0;
    let totalHitRateDexTWFOff = 0;

    let count = 0;

    let firstHitRateStrTWFOffhand = 0;
    let firstHitRateDexTWFOffhand = 0;

    for (let b = bab; b > 0; b = b - 5) {
        const hitRateBaseNum = 20 - ac + b + wpnEnhancement + additionalAB - powerAttack;
        const hitRateBaseStr = Math.max(0.05, hitRateBaseNum + strAdj);
        const hitRateBaseStrTwoHanded = Math.max(0.05, hitRateBaseNum + strAdj);
        const hitRateBaseStrTWF = Math.max(0.05, hitRateBaseNum + strAdj - 2);
        const hitRateBaseStrTWFOffhand = Math.max(0.05, hitRateBaseNum + strAdj - additionalAB + additionalABOff - 2);
        const hitRateBaseDex = Math.max(0.05, hitRateBaseNum + dexAdj);
        const hitRateBaseDexTWF = Math.max(0.05, hitRateBaseNum + dexAdj - 2);
        const hitRateBaseDexTWFOffhand = Math.max(0.05, hitRateBaseNum + dexAdj - additionalAB + additionalABOff - 2);
        const hitRateBaseDexManyshot2 = Math.max(0.05, hitRateBaseNum + dexAdj - 4 + 1);
        const hitRateBaseDexManyshot3 = Math.max(0.05, hitRateBaseNum + dexAdj - 6 + 1);
        const hitRateBaseDexManyshot4 = Math.max(0.05, hitRateBaseNum + dexAdj - 8 + 1);
        
        const hitRateStr = dropInvalidValue(hitRateBaseStr / 20);
        totalHitRateStr += hitRateStr;
        const hitRateStrTwoHanded = dropInvalidValue(hitRateBaseStrTwoHanded / 20);
        totalHitRateStrTwoHanded += hitRateStrTwoHanded;
        const hitRateStrTWF = dropInvalidValue(hitRateBaseStrTWF / 20);
        totalHitRateStrTWFMain += hitRateStrTWF;
        allMissChanceStrTWFMain *= (1 - hitRateStrTWF);
        const hitRateDex = dropInvalidValue(hitRateBaseDex / 20);
        totalHitRateDex += hitRateDex;
        const hitRateDexTWF = dropInvalidValue(hitRateBaseDexTWF / 20);
        totalHitRateDexTWFMain += hitRateDexTWF;
        if (count < 3) {
            const hitRateDexTWFOffhand = dropInvalidValue(hitRateBaseDexTWFOffhand / 20);
            totalHitRateDexTWFOff += hitRateDexTWFOffhand;
            const hitRateStrTWFOffhand = dropInvalidValue(hitRateBaseStrTWFOffhand / 20);
            totalHitRateStrTWFOff += hitRateStrTWFOffhand;
            allMissChanceStrTWFOff *= (1 - hitRateStrTWFOffhand);
        }
        if (count === 0) {
            firstHitRateDexTWFOffhand = dropInvalidValue(hitRateBaseDexTWFOffhand / 20);
            firstHitRateStrTWFOffhand = dropInvalidValue(hitRateBaseStrTWFOffhand / 20);
            singleHitRateStr = hitRateStr;
            singleHitRateStrTwoHanded = hitRateStrTwoHanded;
            singleHitRateDex = hitRateDex;
            totalHitRateDexRapidShot += hitRateDexTWF * 2;
            if (b >= 6) {
                totalHitRateDexManyshot2 = dropInvalidValue(hitRateBaseDexManyshot2 / 20) * 2;
            }
            if (b >= 11) {
                totalHitRateDexManyshot3 = dropInvalidValue(hitRateBaseDexManyshot3 / 20) * 3;
            }
            if (b >= 16) {
                totalHitRateDexManyshot4 = dropInvalidValue(hitRateBaseDexManyshot4 / 20) * 4;
            }
        }
        else {
            totalHitRateDexRapidShot += hitRateDexTWF;
        }
        count += 1;
    }

    console.log('count: ', count);

    totalHitRateDexTWF = totalHitRateDexTWFMain + totalHitRateDexTWFOff;

    totalHitRateStrTWF = totalHitRateStrTWFMain + totalHitRateStrTWFOff;

    singleHitRateStrArray.push({
        AC: ac,
        PA: powerAttack,
        result: singleHitRateStr
    });
    singleHitRateStrTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: singleHitRateStrTwoHanded
    });
    singleHitRateDexArray.push({
        AC: ac,
        PA: powerAttack,
        result: singleHitRateDex
    });

    totalHitRateStrArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateStr
    });
    totalHitRateStrTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateStrTwoHanded
    });
    totalHitRateStrTWFArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateStrTWF
    });
    totalHitRateStrTWFMainArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateStrTWFMain
    });
    totalHitRateStrTWFOffArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateStrTWFOff
    });
    totalHitRateDexArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateDex
    });
    if (!powerAttack) {
        totalHitRateDexRapidShotArray.push({
            AC: ac,
            PA: powerAttack,
            result: totalHitRateDexRapidShot
        });
        totalHitRateDexManyshot2Array.push({
            AC: ac,
            PA: powerAttack,
            result: totalHitRateDexManyshot2
        });
        totalHitRateDexManyshot3Array.push({
            AC: ac,
            PA: powerAttack,
            result: totalHitRateDexManyshot3
        });
        totalHitRateDexManyshot4Array.push({
            AC: ac,
            PA: powerAttack,
            result: totalHitRateDexManyshot4
        });
    }
    totalHitRateDexTWFArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateDexTWF
    });
    totalHitRateDexTWFMainArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateDexTWFMain
    });
    totalHitRateDexTWFOffArray.push({
        AC: ac,
        PA: powerAttack,
        result: totalHitRateDexTWFOff
    });

    const dmgPerHitBase = wpndmg - enemyDR;
    const dmgPerHitOffhandBase = offhandWpndmg - enemyDR;
    const dmgPerHitTwoHandedBase = twoHandedWpndmg - enemyDR;
    let dmgPerHit = dmgPerHitBase + strAdj + powerAttack;
    let dmgPerHitRanged = dmgPerHitBase + strAdj;
    let dmgPerHitTwoHanded = dmgPerHitTwoHandedBase + strAdj * 1.5 + powerAttack * 2;
    let dmgPerHitTwoHandedDex = dmgPerHitBase + strAdj * 1.5 + powerAttack * 2;
    // As checked the rules, unarmed off-hand strike still halves the strength adjustment.
    // Added that unarmed strike would have many risks as checked in Monster Manual (burning body, spike armor, etc.), maybe just use a common dagger instead.
    // let dmgPerHitOffhand = dmgPerHitOffhandBase - additionalDMG + additionalDMGOff + strAdj * 0.5 + powerAttack;
    let dmgPerHitOffhand = dmgPerHitOffhandBase - additionalDMG + additionalDMGOff + strAdj * 0.5;
    let dmgPerHitOffhandDS = dmgPerHitOffhandBase - additionalDMG + additionalDMGOff + strAdj;

    if (dmgPerHit < 0) {
        dmgPerHit = 0;
    }
    if (dmgPerHitTwoHanded < 0) {
        dmgPerHitTwoHanded = 0;
    }
    if (dmgPerHitOffhand < 0) {
        dmgPerHitOffhand = 0;
    }
    if (dmgPerHitOffhandDS < 0) {
        dmgPerHitOffhandDS = 0;
    }
    if (dmgPerHitRanged < 0) {
        dmgPerHitRanged = 0;
    }

    dmgSingleStrArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((singleHitRateStr * dmgPerHit).toFixed(2))
    });
    dmgFullStrArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStr * dmgPerHit).toFixed(2))
    });
    dmgSingleStrTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((singleHitRateStrTwoHanded * dmgPerHitTwoHanded).toFixed(2))
    });
    dmgFullStrTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStrTwoHanded * dmgPerHitTwoHanded).toFixed(2))
    });
    dmgFullStrTWFArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStrTWFMain * dmgPerHit + totalHitRateStrTWFOff * dmgPerHitOffhand).toFixed(2))
    });
    dmgFullStrTWFSingleArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStrTWFMain * dmgPerHit + firstHitRateStrTWFOffhand * dmgPerHitOffhand).toFixed(2))
    });
    dmgFullStrTWFDSArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStrTWFMain * dmgPerHit + totalHitRateStrTWFOff * dmgPerHitOffhandDS).toFixed(2))
    });
    dmgFullStrTWFRendArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((
            totalHitRateStrTWFMain * dmgPerHit +
            totalHitRateStrTWFOff * dmgPerHitOffhand +
            (1 - allMissChanceStrTWFMain) * (1 - allMissChanceStrTWFOff) * (
                dmgPerHitOffhandBase + strAdj * 1.5
            )
        ).toFixed(2))
    })
    dmgFullStrTWFSingleRendArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((
            totalHitRateStrTWFMain * dmgPerHit +
            firstHitRateStrTWFOffhand * dmgPerHitOffhand +
            (1 - allMissChanceStrTWFMain) * firstHitRateStrTWFOffhand * (
                dmgPerHitOffhandBase + strAdj * 1.5
            )
        ).toFixed(2))
    })
    dmgSingleDexArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((singleHitRateDex * dmgPerHit).toFixed(2))
    });
    if (!powerAttack) {
        dmgDexRapidShotArray.push({
            AC: ac,
            PA: powerAttack,
            result: parseFloat((totalHitRateDexRapidShot * dmgPerHitRanged).toFixed(2))
        });
        dmgDexManyshot2Array.push({
            AC: ac,
            PA: powerAttack,
            result: parseFloat((totalHitRateDexManyshot2 * (dmgPerHitRanged + 1)).toFixed(2))
        });
        dmgDexManyshot3Array.push({
            AC: ac,
            PA: powerAttack,
            result: parseFloat((totalHitRateDexManyshot3 * (dmgPerHitRanged + 1)).toFixed(2))
        });
        dmgDexManyshot4Array.push({
            AC: ac,
            PA: powerAttack,
            result: parseFloat((totalHitRateDexManyshot4 * (dmgPerHitRanged + 1)).toFixed(2))
        });
    }
    dmgFullDexArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateDex * dmgPerHit).toFixed(2))
    });
    dmgFullDexTWFArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateDexTWFMain * dmgPerHit + totalHitRateDexTWFOff * dmgPerHitOffhand).toFixed(2))
    });
    dmgFullDexTWFSingleArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateStrTWFMain * dmgPerHit + firstHitRateDexTWFOffhand * dmgPerHitOffhand).toFixed(2))
    });
    dmgFullDexTWFDSArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateDexTWFMain * dmgPerHit + totalHitRateDexTWFOff * dmgPerHitOffhandDS).toFixed(2))
    });
    dmgSingleDexTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((singleHitRateDex * dmgPerHitTwoHandedDex).toFixed(2))
    });
    dmgFullDexTwoHandedArray.push({
        AC: ac,
        PA: powerAttack,
        result: parseFloat((totalHitRateDex * dmgPerHitTwoHandedDex).toFixed(2))
    });

}

function dropInvalidValue(num) {
    if (num > 1) {
        num = 1;
    }
    else if (num < 0) {
        num = 0;
    }
    return num;
}

function mainProcess() {

    console.log('Received BAB: ', bab);
    console.log('Received STR: ', str);
    console.log('Received DEX: ', dex);
    console.log('Received Wpn Enhancement: ', wpnEnhancement);
    console.log('Received dmg Resistance: ', enemyDR);
    console.log('Received additional AB: ', additionalAB);
    console.log('Received additional DMG: ', additionalDMG);
    console.log('Received additional AB (Offhand): ', additionalABOff);
    console.log('Received additional DMG (Offhand): ', additionalDMGOff);
    console.log('Assuming offhand wpn can be benefited from power attack.');
    console.log('Assuming TWF panelty is -2.')

    wpndmg = (1 + 8) / 2 + wpnEnhancement + additionalDMG;
    // Unarmed attack
    // offhandWpndmg = (1 + 3) / 2 + wpnEnhancement + additionalDMG;
    // Dagger
    offhandWpndmg = (1 + 4) / 2 + wpnEnhancement + additionalDMG;
    twoHandedWpndmg = (2 + 12) / 2 + wpnEnhancement + additionalDMG;
    
    console.log('Default wpn dmg: ', wpndmg);
    console.log('Default offhand wpn dmg: ', offhandWpndmg);
    console.log('Calculation starts.');

    let acArray = [
        10, 20, 30, 40, 50
    ];
    if (targetedAC) {
        acArray = [targetedAC];
    }
    strAdj = Math.floor((str - 10) / 2);
    dexAdj = Math.floor((dex - 10) / 2);

    for (const ac of acArray) {
        calculateEstimateddmg(ac, 0);
        if (str >= 13) {
            calculateEstimateddmg(ac, 5);
            calculateEstimateddmg(ac, 10);
        }
    }

    console.log('Calculation finished. Displaying result:');
    console.log('');
    console.log('* Chance to hit *');
    console.log('Chance to hit in first strike (STR): ');
    for (const a of singleHitRateStrArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Chance to hit in first strike (STR, Two Handed): ');
    for (const a of singleHitRateStrTwoHandedArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Chance to hit in first strike (DEX): ');
    for (const a of singleHitRateDexArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (STR): ');
    for (const a of totalHitRateStrArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (STR Two Handed): ');
    for (const a of totalHitRateStrTwoHandedArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (STR TWF): ');
    for (const a of totalHitRateStrTWFArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (STR TWF Mainhand): ');
    for (const a of totalHitRateStrTWFMainArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (STR TWF Offhand): ');
    for (const a of totalHitRateStrTWFOffArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (DEX): ');
    for (const a of totalHitRateDexArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (DEX Rapid Shot): ');
    for (const a of totalHitRateDexRapidShotArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    if (bab >= 6) {
        console.log('Avg hit per round (DEX Manyshot 2): ');
        for (const a of totalHitRateDexManyshot2Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    if (bab >= 11) {
        console.log('Avg hit per round (DEX Manyshot 3): ');
        for (const a of totalHitRateDexManyshot3Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    if (bab >= 16) {
        console.log('Avg hit per round (DEX Manyshot 4): ');
        for (const a of totalHitRateDexManyshot4Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    console.log('Avg hit per round (DEX TWF): ');
    for (const a of totalHitRateDexTWFArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (DEX TWF Mainhand): ');
    for (const a of totalHitRateDexTWFMainArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Avg hit per round (DEX TWF Offhand): ');
    for (const a of totalHitRateDexTWFOffArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('');
    console.log('* Estimated dmg *');
    console.log('Estimated dmg single STR: ');
    for (const a of dmgSingleStrArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg single STR Two-Handed: ');
    for (const a of dmgSingleStrTwoHandedArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg single DEX: ');
    for (const a of dmgSingleDexArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR: ');
    for (const a of dmgFullStrArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR Two-Handed: ');
    for (const a of dmgFullStrTwoHandedArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR TWF: ');
    for (const a of dmgFullStrTWFArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR TWF Single Offhand: ');
    for (const a of dmgFullStrTWFSingleArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR TWF with Double Slice: ');
    for (const a of dmgFullStrTWFDSArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR TWF with Two-Weapon Rend: ');
    for (const a of dmgFullStrTWFRendArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round STR TWF with Two-Weapon Rend and Single Offhand: ');
    for (const a of dmgFullStrTWFSingleRendArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round DEX: ');
    for (const a of dmgFullDexArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    console.log('Estimated dmg full-round DEX Rapid Shot: ');
    for (const a of dmgDexRapidShotArray) {
        console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
    }
    if (bab >= 6) {
        console.log('Estimated dmg DEX Manyshot (2): ');
        for (const a of dmgDexManyshot2Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    if (bab >= 11) {
        console.log('Estimated dmg DEX Manyshot (3): ');
        for (const a of dmgDexManyshot3Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    if (bab >= 16) {
        console.log('Estimated dmg DEX Manyshot (4): ');
        for (const a of dmgDexManyshot4Array) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    if (dex > str) {
        console.log('Estimated dmg full-round DEX TWF: ');
        let c = 0;
        for (const a of dmgFullDexTWFArray) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
            // console.log('TWF - TH: ', a.result - dmgFullStrTwoHandedArray[c].result);
            // console.log('TWF (DEX) - TWF (STR): ', a.result - dmgFullStrTWFArray[c].result);
            c += 1;
        }
        console.log('Estimated dmg full-round DEX TWF with Double Slice: ');
        for (const a of dmgFullDexTWFDSArray) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
        console.log('Estimated dmg full-round DEX TWF Single Offhand: ');
        for (const a of dmgFullDexTWFSingleArray) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
        console.log('Estimated dmg single DEX Two-Handed: ');
        for (const a of dmgSingleDexTwoHandedArray) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
        console.log('Estimated dmg full-round DEX Two-Handed: ');
        for (const a of dmgFullDexTwoHandedArray) {
            console.log(`vs AC ${a.AC}, Power Attack ${a.PA}: ${a.result}`);
        }
    }
    else {
        console.log('STR > DEX, skip DEX melee calculation.');
    }
    console.log('');
}