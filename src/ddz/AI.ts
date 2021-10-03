import Player from "./Player";
import Game from "./Game";
import Poker from "./Poker";
class AI {
  player: Player;
  game: Game;

  constructor(param: { player?: any; game?: any }) {
    param = param || {};
    this.player = param.player;
    this.game = param.game;
  }

  classify(pokerList: Poker[]) {
    pokerList.sort(this.sortFunction);
    if (pokerList.length === 0) {
      return {
        1: [],
        2: [],
        3: [],
        4: [],
      };
    }
    let lastPoker = pokerList[0];
    let curList = [lastPoker];
    let lists: Poker[][] = [];
    for (let i = 1; i < pokerList.length; i++) {
      if (pokerList[i].number !== lastPoker.number) {
        lists.push(curList);
        curList = [pokerList[i]];
      } else {
        curList.push(pokerList[i]);
      }
      lastPoker = pokerList[i];
    }
    lists.push(curList);

    let Count1List: Poker[][] = [];
    let Count2List: Poker[][] = [];
    let Count3List: Poker[][] = [];
    let Count4List: Poker[][] = [];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].length === 3) {
        Count3List.push(lists[i]);
      } else if (lists[i].length === 2) {
        Count2List.push(lists[i]);
      } else if (lists[i].length === 1) {
        Count1List.push(lists[i]);
      } else if (lists[i].length === 4) {
        Count4List.push(lists[i]);
      }
    }

    return {
      1: Count1List,
      2: Count2List,
      3: Count3List,
      4: Count4List,
    };
  }

  getClassifyObj(pokerList0: Poker[]) {
    let poker15: Poker[] = [];
    let poker16: Poker[] = [];
    let poker17: Poker[] = [];

    let pokerList = pokerList0.slice(0);

    for (let i = 0; i < pokerList.length; i++) {
      if (pokerList[i].number === 15) {
        let poker = pokerList.splice(i, 1);
        i--;
        poker15.push(poker[0]);
      } else if (pokerList[i].number === 16) {
        let poker = pokerList.splice(i, 1);
        i--;
        poker16.push(poker[0]);
      } else if (pokerList[i].number === 17) {
        let poker = pokerList.splice(i, 1);
        i--;
        poker17.push(poker[0]);
      }
    }

    let obj = this.classify(pokerList);
    let Count1List = obj[1];
    let Count2List = obj[2];
    let Count3List = obj[3];
    let Count4List = obj[4];

    let four = Count4List;
    let three: Poker[] = [];
    let threeList: Poker[][] = [];
    let two: Poker[] = [];
    let twoList: Poker[][] = [];
    let one: Poker[] = [];
    let oneList: Poker[][] = [];

    if (Count3List.length > 0) {
      let curList = [Count3List[0]];
      let lists: Poker[][] = [];

      for (let i2 = 1; i2 < Count3List.length; i2++) {
        if (Count3List[i2][0].number !== Count3List[i2 - 1][0].number + 1) {
          //@ts-ignore
          lists.push(curList);
          curList = [Count3List[i2]];
        } else {
          curList.push(Count3List[i2]);
        }
      }
      //@ts-ignore
      lists.push(curList);
      for (let i3 = 0; i3 < lists.length; i3++) {
        if (lists[i3].length > 1) {
          threeList.push(lists[i3]);
        } else {
          three.push(lists[i3][0]);
        }
      }
    }

    if (Count2List.length > 0) {
      let curList2 = [Count2List[0]];
      let lists2: Poker[][] = [];
      for (let i4 = 1; i4 < Count2List.length; i4++) {
        if (Count2List[i4][0].number !== Count2List[i4 - 1][0].number + 1) {
          //@ts-ignore
          lists2.push(curList2);
          curList2 = [Count2List[i4]];
        } else {
          curList2.push(Count2List[i4]);
        }
      }
      //@ts-ignore
      lists2.push(curList2);
      for (let i5 = 0; i5 < lists2.length; i5++) {
        if (lists2[i5].length > 2) {
          twoList.push(lists2[i5]);
        } else {
          two = two.concat(lists2[i5]);
        }
      }
    }

    if (Count1List.length > 0) {
      let curList1 = [Count1List[0]];
      let lists1: Poker[][] = [];
      for (let i6 = 1; i6 < Count1List.length; i6++) {
        if (Count1List[i6][0].number !== Count1List[i6 - 1][0].number + 1) {
          //@ts-ignore
          lists1.push(curList1);
          curList1 = [Count1List[i6]];
        } else {
          curList1.push(Count1List[i6]);
        }
      }
      //@ts-ignore
      lists1.push(curList1);
      for (let i7 = 0; i7 < lists1.length; i7++) {
        if (lists1[i7].length > 4) {
          oneList.push(lists1[i7]);
        } else {
          one = one.concat(lists1[i7]);
        }
      }
    }

    //combine one two together
    if (one.length > 0 && two.length > 0) {
      let oneIndex = 0;
      let twoIndex = 0;

      while (true) {
        if (oneIndex > one.length - 1 && twoIndex > two.length - 1) {
          break;
        }

        let startN: number;
        let lastN: number;
        let ones: Poker[] = [];
        let twos: Poker[] = [];

        if (one.length === 0 || oneIndex > one.length - 1) {
          break;
        }

        if (two.length === 0 || twoIndex > two.length - 1) {
          startN = one[oneIndex][0].number;
          ones.push(one[oneIndex]);
          oneIndex++;
        } else {
          if (one[oneIndex][0].number < two[twoIndex][0].number) {
            startN = one[oneIndex][0].number;
            ones.push(one[oneIndex]);
            oneIndex++;
          } else {
            startN = two[twoIndex][0].number;
            twos.push(two[twoIndex]);
            twoIndex++;
          }
        }
        lastN = startN;

        do {
          if (oneIndex > one.length - 1 && twoIndex > two.length - 1) {
            break;
          }

          if (oneIndex < one.length && one[oneIndex][0].number === lastN + 1) {
            ones.push(one[oneIndex]);
            oneIndex++;
          } else if (
            twoIndex < two.length &&
            two[twoIndex][0].number === lastN + 1
          ) {
            twos.push(two[twoIndex]);
            twoIndex++;
          } else {
            break;
          }

          lastN = lastN + 1;
          if (lastN === startN + 4) {
            if (twos.length < 4) {
              //combine
              let cmbList: Poker[] = [];
              for (let i8 = 0; i8 < ones.length; i8++) {
                cmbList.push(ones[i8]);

                //delete from one
                for (let j = 0; j < one.length; j++) {
                  if (one[j] === ones[i8]) {
                    one.splice(j, 1);
                    break;
                  }
                }
              }

              for (let i9 = 0; i9 < twos.length; i9++) {
                let pokers = twos[i9];

                //delete from two
                for (let j1 = 0; j1 < two.length; j1++) {
                  if (two[j1] === pokers) {
                    two.splice(j1, 1);
                    break;
                  }
                }
                // @ts-ignore
                let poker = pokers.splice(0, 1);
                cmbList.push(poker);
                one.push(pokers);
              }
              // @ts-ignore
              cmbList.sort(this.sortArray);
              oneList.push(cmbList);
              // @ts-ignore
              one.sort(this.sortArray);

              oneIndex = 0;
              twoIndex = 0;
              break;
            }
          }
        } while (true);
      }
    }

    //combine one oneList together
    for (let i10 = 0; i10 < one.length; i10++) {
      let find1 = false;
      for (let i11 = 0; i11 < oneList.length; i11++) {
        if (one[i10][0].number === oneList[i11][0][0].number - 1) {
          oneList[i11].unshift(one[i10]);
          find1 = true;
          break;
        } else if (
          one[i10][0].number ===
          oneList[i11][oneList[i11].length - 1][0].number + 1
        ) {
          oneList[i11].push(one[i10]);
          find1 = true;
          break;
        }
      }
      if (find1) {
        one.splice(i10, 1);
        i10--;
      }
    }

    //combine oneList oneList together
    // @ts-ignore
    oneList.sort(this.sortList);
    for (let i12 = 1; i12 < oneList.length; i12++) {
      if (
        oneList[i12][0][0].number ===
        oneList[i12 - 1][oneList[i12 - 1].length - 1][0].number + 1
      ) {
        oneList[i12 - 1] = oneList[i12 - 1].concat(oneList[i12]);
        oneList.splice(i12, 1);
        i12--;
      }
    }

    return {
      four,
      three,
      threeList,
      two,
      twoList,
      one,
      oneList,
      poker15,
      poker16,
      poker17,
    };
  }

  getJiaoFen() {
    this.player.getClassifyObj();
    let classifyObj = this.player.classifyObj;
    let num15 = classifyObj!.poker15.length;
    let num16 = classifyObj!.poker16.length;
    let num17 = classifyObj!.poker17.length;

    let score = num15 * 2 + num16 * 3 + num17 * 4;
    if (score < 8) {
      return 0;
    } else if (score < 10) {
      return 1;
    } else if (score < 12) {
      return 2;
    } else {
      return 3;
    }
  }

  //接牌1 最小接 不拆 炸
  getByObj1(lastObj: any) {
    let obj: { type: any; poker: Poker[]; sx: Poker[] } | null;
    obj = this.getSmallestObjByObj(lastObj);
    if (!obj) {
        // @ts-ignore
      obj = this.getByBoom(lastObj);
    }
    return obj;
  }

  //接牌2 最小接 炸 拆
  getByObj2(lastObj: any) {
    let obj
    obj = this.getByObj1(lastObj);
    if (!obj) {
      obj = this.getBySplit(lastObj);
    }
    return obj;
  }

  //接牌3 最小接 不拆 不炸 不出王、2、AAA
  getByObj3(lastObj: any) {
    let obj: null;
    obj = this.getSmallestObjNoBig(lastObj);

    return obj;
  }

  //接牌4
  getByObj4(lastObj: { type: string }) {
    let obj: any;
    if (lastObj.type === "one") {
      // @ts-ignore
      obj = this.getByObj5(lastObj);
    } else {
      obj = this.getByObj2(lastObj);
    }

    return obj;
  }

  getByBoom(lastObj: { type: string; four: { number: number }[] }) {
    let classifyObj = this.player.classifyObj;

    let obj: { type: string; poker: any; four?: any; sx?: Poker[] };
    let poker: Poker[];

    if (lastObj.type === "sx") {
      return null;
    }

    if (classifyObj!.four.length > 0) {
      if (lastObj.type === "four") {
        for (let i = 0; i < classifyObj!.four.length; i++) {
          if (classifyObj!.four[i][0].number > lastObj.four[0].number) {
            poker = classifyObj!.four[i];
            break;
          }
        }
      } else {
        poker = classifyObj!.four[0];
      }
    }
// @ts-ignore
    if (!poker) {
      if (classifyObj!.poker15.length === 4) {
        poker = classifyObj!.poker15;
      }
    }
// @ts-ignore
    if (poker) {
      obj = {
        type: "four",
        poker: poker,
        four: poker,
      };
    } else {
      if (classifyObj!.poker16.length > 0 && classifyObj!.poker17.length > 0) {
        obj = {
          type: "sx",
          poker: classifyObj!.poker16.concat(classifyObj!.poker17),
          sx: classifyObj!.poker16.concat(classifyObj!.poker17),
        };
      }
    }
// @ts-ignore
    return obj;
  }

  //接牌5
  getByObj5(lastObj: { one: { number: number }[] }) {
      // @ts-ignore
    let obj = this.getByBoom(lastObj);

    if (!obj) {
      if (
        this.player.pokerList[this.player.pokerList.length - 1].number >
        lastObj.one[0].number
      ) {
        obj = {
          type: "one",
          poker: [this.player.pokerList[this.player.pokerList.length - 1]],
          // @ts-ignore
          one: [this.player.pokerList[this.player.pokerList.length - 1]],
        };
      }
    }

    return obj;
  }

  //接牌6
  getByObj6(lastObj: { player: { type: string } }) {
    let obj: any;
    if (lastObj.player.type === "dizhu") {
      obj = this.getByObj1(lastObj);
    } else {
      obj = this.getByObj3(lastObj);
    }

    return obj;
  }

  //接牌
  playByObj(lastObj: Poker) {
    let obj: { type: string; poker: string[] };

    if (lastObj.type === "sx") {
      obj = {
        type: "pass",
        poker: ["pass"],
      };
      this.player.deleteFromPokerListAndSendByObj(obj);
      return;
    }

    if (this.player.type === "dizhu") {
      if (
        this.player.next!.pokerList.length === 1 ||
        this.player.last!.pokerList.length === 1
      ) {
        obj = this.getByObj4(lastObj);
      } else {
        // @ts-ignore
        obj = this.getByObj1(lastObj);
      }
    } else {
      if (this.player.next!.type === this.player.type) {
          // @ts-ignore
        obj = this.getByObj6(lastObj);
      } else {
        if (this.player.next!.pokerList.length === 1) {
            // @ts-ignore
          if (lastObj.player.type === "dizhu") {
            obj = this.getByObj4(lastObj);
          } else {
            if (lastObj.type === "one") {
                // @ts-ignore
              let canNotGet = this.isPlayerCanNotGetOne(lastObj);
              if (canNotGet) {
                //pass
              } else {
                  // @ts-ignore
                obj = this.getByObj5(lastObj);
              }
            } else {
              //pass
            }
          }
        } else {
            // @ts-ignore
          obj = this.getByObj6(lastObj);
        }
      }
    }
// @ts-ignore
    if (!obj) {
      obj = {
        type: "pass",
        poker: ["pass"],
      };
    }
    this.player.deleteFromPokerListAndSendByObj(obj);
  }

  isPlayerCanNotGetOne(obj: { one: { number: any }[] }) {
    let allPoker = {
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
    };
    let oldPokerList = this.game.oldPokerList;
    for (let i = 0; i < oldPokerList.length; i++) {
      // @ts-ignore
      for (let j = 0; j < oldPokerList[i].poker.length; j++) {
        // @ts-ignore
        allPoker[oldPokerList[i].poker[j].number]++;
      }
    }
    let deskPokerObj = this.game.deskPokerObj;
    // @ts-ignore
    for (let j = 0; j < deskPokerObj.poker.length; j++) {
      // @ts-ignore
      allPoker[deskPokerObj.poker[j].number]++;
    }
    let pokers = this.player.pokerList;
    for (let j = 0; j < pokers.length; j++) {
      allPoker[pokers[j].number]++;
    }

    let num = obj.one[0].number;
    let result = true;
    if (num === 16) {
      if (allPoker[17] !== 1) {
        return false;
      }
    } else if (num === 15) {
      if (allPoker[16] !== 1 || allPoker[17] !== 1) {
        return false;
      }
    } else {
      for (let n = num + 1; n <= 15; n++) {
        if (allPoker[n] !== 4) {
          return false;
        }
      }
    }

    return true;
  }

  //出牌1
  playByTypys1() {
    let types = [
      "threeWithTwoList",
      "threeWithOneList",
      "threeList",
      "twoList",
      "oneList",
      "threeWithTwo",
      "threeWithOne",
      "three",
      "two",
      "one",
      "four",
      "sx",
    ];
    for (let i = 0; i < types.length; i++) {
        // @ts-ignore
      let obj = this.getSmallestObjByType(types[i]);
      if (!obj) {
        continue;
      }
      this.player.deleteFromPokerListAndSendByObj(obj);
      break;
    }
  }

  //出牌2
  playByTypys2() {
    let types = [
      "threeWithTwoList",
      "threeWithOneList",
      "threeList",
      "twoList",
      "oneList",
      "threeWithTwo",
      "threeWithOne",
      "three",
      "two",
      "four",
      "sx",
      "one",
    ];
    for (let i = 0; i < types.length; i++) {
      let obj = this.getSmallestObjByType(types[i], true);
      if (!obj) {
        continue;
      }
      this.player.deleteFromPokerListAndSendByObj(obj);
      break;
    }
  }

  //出牌 最小一张
  playSmallestOne() {
    let obj = {
      type: "one",
      poker: [this.player.pokerList[0]],
      one: [this.player.pokerList[0]],
    };
    this.player.deleteFromPokerListAndSendByObj(obj);
  }

  //出牌
  playByAllType() {
    if (this.player.type === "dizhu") {
      if (
        this.player.next!.pokerList.length === 1 ||
        this.player.last!.pokerList.length === 1
      ) {
        this.playByTypys2();
      } else {
        this.playByTypys1();
      }
    } else {
      if (this.player.next!.type === "nongmin") {
        if (this.player.next!.pokerList.length === 1) {
          this.playSmallestOne();
        } else {
          this.playByTypys1();
        }
      } else {
        if (this.player.next!.pokerList.length === 1) {
          this.playByTypys2();
        } else {
          this.playByTypys1();
        }
      }
    }
  }

  //接 队友
  getSmallestObjNoBig(lastObj: {
    type: any;
    one: { number: number }[];
    two: { number: number }[];
    three: { number: number }[];
  }) {
    let classifyObj = this.player.classifyObj;

    let type = lastObj.type;
    let obj = null;
    if (type === "one") {
      let poker: Poker;
      if (classifyObj!.one.length > 0) {
        for (let i = 0; i < classifyObj!.one.length; i++) {
          if (classifyObj!.one[i][0].number > lastObj.one[0].number) {
            poker = classifyObj!.one[i];
            break;
          }
        }
      }
//@ts-ignore
      if (poker) {
        //@ts-ignore
        obj = {
          type: type,
          poker: poker,
          one: poker,
        };
      }
    } else if (type === "two") {
      let poker: Poker;

      if (classifyObj.two.length > 0) {
        for (let i = 0; i < classifyObj.two.length; i++) {
          if (classifyObj.two[i][0].number > lastObj.two[0].number) {
            poker = classifyObj.two[i];
            break;
          }
        }
      }

//@ts-ignore
      if (poker) {
        //@ts-ignore
        obj = {
          type: type,
          poker: poker,
          two: poker,
        };
      }
    } else if (type === "three") {
      let poker: Poker;

      if (classifyObj.three.length > 0) {
        for (let i = 0; i < classifyObj.three.length; i++) {
          if (classifyObj.three[i][0].number > lastObj.three[0].number) {
            if (classifyObj.three[i][0].number <= 13) {
              poker = classifyObj.three[i];
            }
            break;
          }
        }
      }

//@ts-ignore
      if (poker) {
        //@ts-ignore
        obj = {
          type: type,
          poker: poker,
          three: poker,
        };
      }
    } else if (type === "threeWithOne") {
      let pokerThree: string | any[] | Poker;
      let one: Poker;
      if (classifyObj.three.length > 0) {
        if (classifyObj.three.length > 0) {
          for (let i = 0; i < classifyObj.three.length; i++) {
            if (classifyObj.three[i][0].number > lastObj.three[0].number) {
              if (classifyObj.three[i][0].number <= 13) {
                pokerThree = classifyObj.three[i];
              }
              break;
            }
          }
        }
      }

      if (classifyObj.one.length > 0) {
        one = classifyObj.one[0];
      }

    // @ts-ignore
      if (pokerThree && one) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(one),
          three: pokerThree,
          one: one,
        };
      }
    } else if (type === "threeWithTwo") {
      let pokerThree: string | any[] | Poker;
      let two: Poker;
      if (classifyObj.three.length > 0) {
        if (classifyObj.three.length > 0) {
          for (let i = 0; i < classifyObj.three.length; i++) {
            if (classifyObj.three[i][0].number > lastObj.three[0].number) {
              if (classifyObj.three[i][0].number <= 13) {
                pokerThree = classifyObj.three[i];
              }
              break;
            }
          }
        }
      }

      if (classifyObj.two.length > 0) {
        two = classifyObj.two[0];
      }

    // @ts-ignore
      if (pokerThree && two) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(two),
          three: pokerThree,
          two: two,
        };
      }
    }

    return obj;
  }

  //最小接 不拆
  getSmallestObjByObj(lastObj: {
    type: any;
    one: { number: number }[];
    two: { number: number }[];
    three: { number: number }[];
    four: { number: number }[];
    list: string | any[];
  }) {
    let classifyObj = this.player.classifyObj;

    let type = lastObj.type;
    let obj = null;
    if (type === "one") {
      let poker: Poker | Poker[];
      if (classifyObj.one.length > 0) {
        for (let i = 0; i < classifyObj.one.length; i++) {
          if (classifyObj.one[i][0].number > lastObj.one[0].number) {
            poker = classifyObj.one[i];
            break;
          }
        }
      }

    // @ts-ignore
      if (!poker) {
        if (lastObj.one[0].number < 15 && classifyObj.poker15.length > 0) {
          poker = classifyObj.poker15.slice(0, 1);
        } else {
          //有王出王
          if (lastObj.one[0].number < 16 && classifyObj.poker16.length > 0) {
            poker = classifyObj.poker16;
          } else if (
            lastObj.one[0].number < 17 &&
            classifyObj.poker17.length > 0
          ) {
            poker = classifyObj.poker17;
          }
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          one: poker,
        };
      }
    } else if (type === "two") {
      let poker: Poker | Poker[];

      if (classifyObj.two.length > 0) {
        for (let i = 0; i < classifyObj.two.length; i++) {
          if (classifyObj.two[i][0].number > lastObj.two[0].number) {
            poker = classifyObj.two[i];
            break;
          }
        }
      }

    // @ts-ignore
      if (!poker) {
        if (lastObj.two[0].number < 15 && classifyObj.poker15.length > 1) {
          poker = classifyObj.poker15.slice(0, 2);
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          two: poker,
        };
      }
    } else if (type === "three") {
      let poker: Poker | Poker[];

      if (classifyObj.three.length > 0) {
        for (let i = 0; i < classifyObj.three.length; i++) {
          if (classifyObj.three[i][0].number > lastObj.three[0].number) {
            poker = classifyObj.three[i];
            break;
          }
        }
      }

    // @ts-ignore
      if (!poker) {
        if (lastObj.three[0].number < 15 && classifyObj.poker15.length === 3) {
          poker = classifyObj.poker15;
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          three: poker,
        };
      }
    } else if (type === "threeWithOne") {
      let pokerThree: string | any[] | Poker;
      let one: Poker | Poker[];
      if (classifyObj.three.length > 0) {
        if (classifyObj.three.length > 0) {
          for (let i = 0; i < classifyObj.three.length; i++) {
            if (classifyObj.three[i][0].number > lastObj.three[0].number) {
              pokerThree = classifyObj.three[i];
              break;
            }
          }
        }
      }
      // @ts-ignore
      if (!pokerThree) {
        if (lastObj.three[0].number < 15 && classifyObj.poker15.length === 3) {
          pokerThree = classifyObj.poker15;
        }
      }

      if (classifyObj.one.length > 0) {
        one = classifyObj.one[0];
      }
      // @ts-ignore
      if (!one && classifyObj.poker15.length > 0) {
        one = classifyObj.poker15.slice(0, 1);
      }

    // @ts-ignore
      if (pokerThree && one) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(one),
          three: pokerThree,
          one: one,
        };
      }
    } else if (type === "threeWithTwo") {
      let pokerThree: string | any[] | Poker;
      let two: Poker | Poker[];
      if (classifyObj.three.length > 0) {
        if (classifyObj.three.length > 0) {
          for (let i = 0; i < classifyObj.three.length; i++) {
            if (classifyObj.three[i][0].number > lastObj.three[0].number) {
              pokerThree = classifyObj.three[i];
              break;
            }
          }
        }
      }
      // @ts-ignore
      if (!pokerThree) {
        if (lastObj.three[0].number < 15 && classifyObj.poker15.length === 3) {
          pokerThree = classifyObj.poker15;
        }
      }

      if (classifyObj.two.length > 0) {
        two = classifyObj.two[0];
      }
      // @ts-ignore
      if (!two && classifyObj.poker15.length > 1) {
        two = classifyObj.poker15.slice(0, 2);
      }

    // @ts-ignore
      if (pokerThree && two) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(two),
          three: pokerThree,
          two: two,
        };
      }
    } else if (type === "four") {
      let poker: Poker[];

      if (classifyObj.four.length > 0) {
        for (let i = 0; i < classifyObj.four.length; i++) {
          if (classifyObj.four[i][0].number > lastObj.four[0].number) {
            poker = classifyObj.four[i];
            break;
          }
        }
      }

    // @ts-ignore
      if (!poker) {
        if (classifyObj.poker15.length === 4) {
          poker = classifyObj.poker15;
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          four: poker,
        };
      }
    } else if (type === "fourWithOne") {
      let pokerFour: string | any[];
      let one1: Poker;
      let one2: Poker;

      if (classifyObj.four.length > 0) {
        for (let i = 0; i < classifyObj.four.length; i++) {
          if (classifyObj.four[i][0].number > lastObj.four[0].number) {
            pokerFour = classifyObj.four[i];
            break;
          }
        }
      }

      if (classifyObj.one.length > 1) {
        one1 = classifyObj.one[0];
        one2 = classifyObj.one[1];
      }

    // @ts-ignore
      if (pokerFour && one1 && one2) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerFour.concat(one1).concat(one2),
          four: pokerFour,
        };
      }
    } else if (type === "fourWithTwo") {
      let pokerFour: string | any[];
      let two1: Poker;
      let two2: Poker;

      if (classifyObj.four.length > 0) {
        for (let i = 0; i < classifyObj.four.length; i++) {
          if (classifyObj.four[i][0].number > lastObj.four[0].number) {
            pokerFour = classifyObj.four[i];
            break;
          }
        }
      }

      if (classifyObj.two.length > 1) {
        two1 = classifyObj.two[0];
        two2 = classifyObj.two[1];
      }

    // @ts-ignore
      if (pokerFour && two1 && two2) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerFour.concat(two1).concat(two2),
          four: pokerFour,
        };
      }
    } else if (type === "threeWithOneList") {
      if (classifyObj.threeList.length > 0) {
        for (let i = 0; i < classifyObj.threeList.length; i++) {
          if (
            classifyObj.threeList[i].length === lastObj.list.length &&
            classifyObj.threeList[i][0][0].number >
              lastObj.list[0].three[0].number
          ) {
            if (classifyObj.one.length >= classifyObj.threeList[i].length) {
                // @ts-ignore
              let pokerThree = classifyObj.threeList[i].flat(1);
              let pokerOne = classifyObj.one
                .slice(0, classifyObj.threeList[i].length)
                // @ts-ignore
                .flat(1);
                // @ts-ignore
              obj = {
                type: type,
                poker: pokerThree.concat(pokerOne),
                list: classifyObj.threeList[i].map(function (item) {
                  return {
                    three: item,
                  };
                }),
              };
            }
            break;
          }
        }
      }
    } else if (type === "threeWithTwoList") {
      if (classifyObj.threeList.length > 0) {
        for (let i = 0; i < classifyObj.threeList.length; i++) {
          if (
            classifyObj.threeList[i].length === lastObj.list.length &&
            classifyObj.threeList[i][0][0].number >
              lastObj.list[0].three[0].number
          ) {
            if (classifyObj.two.length >= classifyObj.threeList[i].length) {
                // @ts-ignore
              let pokerThree = classifyObj.threeList[i].flat(1);
              let pokerTwo = classifyObj.two
                .slice(0, classifyObj.threeList[i].length)
                // @ts-ignore
                .flat(1);
                // @ts-ignore
              obj = {
                type: type,
                poker: pokerThree.concat(pokerTwo),
                list: classifyObj.threeList[i].map(function (item) {
                  return {
                    three: item,
                  };
                }),
              };
            }
            break;
          }
        }
      }
    } else if (type === "oneList") {
      if (classifyObj.oneList.length > 0) {
        for (let i = 0; i < classifyObj.oneList.length; i++) {
          if (
            classifyObj.oneList[i].length === lastObj.list.length &&
            classifyObj.oneList[i][0][0].number > lastObj.list[0].one[0].number
          ) {
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: classifyObj.oneList[i].flat(1),
              list: classifyObj.oneList[i].map(function (item) {
                return {
                  one: item,
                };
              }),
            };
            break;
          }
        }
      }
    } else if (type === "twoList") {
      if (classifyObj.twoList.length > 0) {
        for (let i = 0; i < classifyObj.twoList.length; i++) {
          if (
            classifyObj.twoList[i].length === lastObj.list.length &&
            classifyObj.twoList[i][0][0].number > lastObj.list[0].two[0].number
          ) {
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: classifyObj.twoList[i].flat(1),
              list: classifyObj.twoList[i].map(function (item) {
                return {
                  two: item,
                };
              }),
            };
            break;
          }
        }
      }
    } else if (type === "threeList") {
      if (classifyObj.threeList.length > 0) {
        for (let i = 0; i < classifyObj.threeList.length; i++) {
          if (
            classifyObj.threeList[i].length === lastObj.list.length &&
            classifyObj.threeList[i][0][0].number >
              lastObj.list[0].three[0].number
          ) {
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: classifyObj.threeList[i].flat(1),
              list: classifyObj.threeList[i].map(function (item) {
                return {
                  three: item,
                };
              }),
            };
            break;
          }
        }
      }
    } else if (type === "sx") {
      if (classifyObj.poker16.length > 0 && classifyObj.poker17.length > 0) {
        return {
          type: type,
          poker: classifyObj.poker16.concat(classifyObj.poker17),
          sx: classifyObj.poker16.concat(classifyObj.poker17),
        };
      }
    }

    return obj;
  }

  getSmallestObjByType(type: string, oneBigToSmall: boolean | undefined) {
    let classifyObj = this.player.classifyObj;

    let obj = null;
    if (type === "one") {
      if (oneBigToSmall) {
        let poker: Poker | Poker[];
        if (classifyObj.poker17.length > 0) {
          poker = classifyObj.poker17;
        } else if (classifyObj.poker16.length > 0) {
          poker = classifyObj.poker16;
        } else if (classifyObj.poker15.length > 0) {
          poker = classifyObj.poker15.slice(0, 1);
        } else {
          poker = classifyObj.one[classifyObj.one.length - 1];
        }
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          one: poker,
        };
      } else {
        let poker: Poker | Poker[];
        if (classifyObj.one.length > 0) {
          poker = classifyObj.one[0];
        } else {
          if (
            classifyObj.poker15.length > 0 &&
            classifyObj.poker15.length < 4
          ) {
            poker = classifyObj.poker15.slice(0, 1);
          } else {
            if (
              classifyObj.poker17.length === 0 ||
              classifyObj.poker16.length === 0
            ) {
              if (classifyObj.poker16.length > 0) {
                poker = classifyObj.poker16;
              } else if (classifyObj.poker17.length > 0) {
                poker = classifyObj.poker17;
              }
            }
          }
        }
        // @ts-ignore
        if (poker) {
            // @ts-ignore
          obj = {
            type: type,
            poker: poker,
            one: poker,
          };
        }
      }
    } else if (type === "two") {
      let poker: Poker | Poker[];

      if (oneBigToSmall) {
        if (classifyObj.two.length > 0) {
          poker = classifyObj.two[0];
        } else {
          if (classifyObj.poker15.length === 2) {
            poker = classifyObj.poker15;
          }
        }
      } else {
        if (classifyObj.two.length > 0) {
          poker = classifyObj.two[0];
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          two: poker,
        };
      }
    } else if (type === "three") {
      let poker: Poker | Poker[];

      if (oneBigToSmall) {
        if (classifyObj.three.length > 0) {
          poker = classifyObj.three[0];
        } else {
          if (classifyObj.poker15.length === 3) {
            poker = classifyObj.poker15;
          }
        }
      } else {
        if (classifyObj.three.length > 0) {
          poker = classifyObj.three[0];
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          three: poker,
        };
      }
    } else if (type === "threeWithOne") {
      let pokerThree: string | any[] | Poker;
      let one: Poker | Poker[];
      if (classifyObj.three.length > 0) {
        pokerThree = classifyObj.three[0];
      }
      if (classifyObj.one.length > 0) {
        one = classifyObj.one[0];
      }

      if (oneBigToSmall) {
        // @ts-ignore
        if (!pokerThree && classifyObj.poker15.length === 3) {
          pokerThree = classifyObj.poker15;
        }
        // @ts-ignore
        if (!one && classifyObj.poker15.length === 1) {
          one = classifyObj.poker15;
        }
      }

    // @ts-ignore
      if (pokerThree && one) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(one),
          three: pokerThree,
          one: one,
        };
      }
    } else if (type === "four") {
      let poker: Poker[];

      if (oneBigToSmall) {
        if (classifyObj.four.length > 0) {
          poker = classifyObj.four[0];
        } else {
          if (classifyObj.poker15.length === 4) {
            poker = classifyObj.poker15;
          }
        }
      } else {
        if (classifyObj.four.length > 0) {
          poker = classifyObj.four[0];
        }
      }

    // @ts-ignore
      if (poker) {
        // @ts-ignore
        obj = {
          type: type,
          poker: poker,
          four: poker,
        };
      }
    } else if (type === "threeWithTwo") {
      let pokerThree: string | any[] | Poker;
      let two: Poker | Poker[];
      if (classifyObj.three.length > 0) {
        pokerThree = classifyObj.three[0];
      }
      if (classifyObj.two.length > 0) {
        two = classifyObj.two[0];
      }

      if (oneBigToSmall) {
        // @ts-ignore
        if (!pokerThree && classifyObj.poker15.length === 3) {
          pokerThree = classifyObj.poker15;
        }
        // @ts-ignore
        if (!two && classifyObj.poker15.length === 2) {
          two = classifyObj.poker15;
        }
      }

    // @ts-ignore
      if (pokerThree && two) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: pokerThree.concat(two),
          three: pokerThree,
          two: two,
        };
      }
    } else if (type === "threeWithOneList") {
      if (classifyObj.threeList.length > 0) {
        if (classifyObj.one.length >= classifyObj.threeList[0].length) {
            // @ts-ignore
          let pokerThree = classifyObj.threeList[0].flat(1);
          let pokerOne = classifyObj.one
            .slice(0, classifyObj.threeList[0].length)
            // @ts-ignore
            .flat(1);
            // @ts-ignore
          obj = {
            type: type,
            poker: pokerThree.concat(pokerOne),
            list: classifyObj.threeList[0].map(function (item) {
              return {
                three: item,
              };
            }),
          };
        }
      }
    } else if (type === "threeWithTwoList") {
      if (classifyObj.threeList.length > 0) {
        if (classifyObj.two.length >= classifyObj.threeList[0].length) {
            // @ts-ignore
          let pokerThree = classifyObj.threeList[0].flat(1);
          let pokerTwo = classifyObj.two
            .slice(0, classifyObj.threeList[0].length)
            // @ts-ignore
            .flat(1);
            // @ts-ignore
          obj = {
            type: type,
            poker: pokerThree.concat(pokerTwo),
            list: classifyObj.threeList[0].map(function (item) {
              return {
                three: item,
              };
            }),
          };
        }
      }
    } else if (type === "oneList") {
      if (classifyObj.oneList.length > 0) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: classifyObj.oneList[0].flat(1),
          list: classifyObj.oneList[0].map(function (item) {
            return {
              one: item,
            };
          }),
        };
      }
    } else if (type === "twoList") {
      if (classifyObj.twoList.length > 0) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: classifyObj.twoList[0].flat(1),
          list: classifyObj.twoList[0].map(function (item) {
            return {
              two: item,
            };
          }),
        };
      }
    } else if (type === "threeList") {
      if (classifyObj.threeList.length > 0) {
        // @ts-ignore
        obj = {
          type: type,
          // @ts-ignore
          poker: classifyObj.threeList[0].flat(1),
          list: classifyObj.threeList[0].map(function (item) {
            return {
              three: item,
            };
          }),
        };
      }
    } else if (type === "sx") {
      if (classifyObj.poker16.length > 0 && classifyObj.poker17.length > 0) {
        return {
          type: type,
          poker: classifyObj.poker16.concat(classifyObj.poker17),
          sx: classifyObj.poker16.concat(classifyObj.poker17),
        };
      }
    }

    return obj;
  }

  //接牌 拆牌
  getBySplit(lastObj: {
    type: any;
    two: { number: number }[];
    three: { number: number }[];
    list: string | any[];
  }) {
    let pokerList = this.player.pokerList;

    let lastPoker = pokerList[0];
    let curList = [lastPoker];
    let lists: Poker[][] = [];
    for (let i = 1; i < pokerList.length; i++) {
      if (pokerList[i].number !== lastPoker.number) {
        lists.push(curList);
        curList = [pokerList[i]];
      } else {
        curList.push(pokerList[i]);
      }
      lastPoker = pokerList[i];
    }
    lists.push(curList);

    let Count1List: Poker[][] = [];
    let Count2List: Poker[][] = [];
    let Count3List: Poker[][] = [];
    let Count4List: Poker[][] = [];
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].length === 3) {
        Count3List.push(lists[i]);
      } else if (lists[i].length === 2) {
        Count2List.push(lists[i]);
      } else if (lists[i].length === 1) {
        Count1List.push(lists[i]);
      } else if (lists[i].length === 4) {
        Count4List.push(lists[i]);
      }
    }

    let type = lastObj.type;
    let obj = null;

    if (type === "two") {
      if (Count2List.length > 0) {
        for (let i = 0; i < Count2List.length; i++) {
          if (Count2List[i][0].number > lastObj.two[0].number) {
              // @ts-ignore
            obj = {
              type: type,
              poker: Count2List[i],
              two: Count2List[i],
            };
            break;
          }
        }
      } else if (Count3List.length > 0) {
        for (let i = 0; i < Count3List.length; i++) {
          if (Count3List[i][0].number > lastObj.two[0].number) {
            let poker = Count3List[i].slice(0, 2);
            // @ts-ignore
            obj = {
              type: type,
              poker: poker,
              two: poker,
            };
            break;
          }
        }
      }
    } else if (type === "threeWithOne") {
      if (Count3List.length > 0) {
        for (let i = 0; i < Count3List.length; i++) {
          if (Count3List[i][0].number > lastObj.three[0].number) {
            let one: any;
            if (Count1List.length > 0) {
              one = Count1List[0];
            } else if (Count2List.length > 0) {
              one = Count2List[0].slice(0, 1);
            } else if (Count3List.length > 0) {
              for (let j = 0; j < Count3List.length; j++) {
                if (j === i) {
                  continue;
                }
                one = Count3List[j].slice(0, 1);
              }
            }

            if (one) {
                // @ts-ignore
              obj = {
                type: type,
                poker: Count3List[i].concat(one),
                three: Count3List[i],
                one: one,
              };
            }
            break;
          }
        }
      }
    } else if (type === "threeWithTwo") {
      if (Count3List.length > 0) {
        for (let i = 0; i < Count3List.length; i++) {
          if (Count3List[i][0].number > lastObj.three[0].number) {
            let two: any;
            if (Count2List.length > 0) {
              two = Count2List[0];
            } else if (Count3List.length > 0) {
              for (let j = 0; j < Count3List.length; j++) {
                if (j === i) {
                  continue;
                }
                two = Count3List[j].slice(0, 2);
              }
            }

            if (two) {
                // @ts-ignore
              obj = {
                type: type,
                poker: Count3List[i].concat(two),
                three: Count3List[i],
                two: two,
              };
            }
            break;
          }
        }
      }
    } else if (type === "threeWithOneList") {
      if (Count3List.length >= lastObj.list.length) {
        for (let i = 0; i < Count3List.length - lastObj.list.length + 1; i++) {
          if (
            Count3List[i][0].number > lastObj.list[0].three[0].number &&
            Count3List[i][0].number + lastObj.list.length - 1 ===
              Count3List[i + lastObj.list.length - 1][0].number &&
            Count3List[i + lastObj.list.length - 1][0].number <= 14
          ) {
            let oneList = [];

            for (
              let j = 0;
              j < Count1List.length && oneList.length < lastObj.list.length;
              j++
            ) {
                // @ts-ignore
              oneList.push(Count1List[j]);
            }

            for (
              let j = 0;
              j < Count2List.length && oneList.length < lastObj.list.length;
              j++
            ) {
                // @ts-ignore
              oneList.push(Count2List[j].slice(0, 1));
              if (oneList.length < lastObj.list.length) {
                // @ts-ignore
                oneList.push(Count2List[j].slice(1, 2));
              }
            }

            for (
              let j = 0;
              j < Count3List.length && oneList.length < lastObj.list.length;
              j++
            ) {
              if (j >= i && j <= i + lastObj.list.length - 1) {
                continue;
              }
              // @ts-ignore
              oneList.push(Count3List[j].slice(0, 1));
              if (oneList.length < lastObj.list.length) {
                // @ts-ignore
                oneList.push(Count3List[j].slice(1, 2));
              }
              if (oneList.length < lastObj.list.length) {
                // @ts-ignore
                oneList.push(Count3List[j].slice(2, 3));
              }
            }

            if (oneList.length === lastObj.list.length) {
              let poker = [];
              let list = [];
              for (let j = 0; j < lastObj.list.length; j++) {
                // @ts-ignore
                poker = poker.concat(Count3List[i + j]);
                poker = poker.concat(oneList[i]);
                let threeOne = {
                  three: Count3List[i + j],
                  one: oneList[i],
                };
                // @ts-ignore
                list.push(threeOne);
              }

              // @ts-ignore
              obj = {
                type: type,
                poker: poker,
                list: list,
              };
            }
            break;
          }
        }
      }
    } else if (type === "threeWithTwoList") {
      if (Count3List.length >= lastObj.list.length) {
        for (let i = 0; i < Count3List.length - lastObj.list.length + 1; i++) {
          if (
            Count3List[i][0].number > lastObj.list[0].three[0].number &&
            Count3List[i][0].number + lastObj.list.length - 1 ===
              Count3List[i + lastObj.list.length - 1][0].number &&
            Count3List[i + lastObj.list.length - 1][0].number <= 14
          ) {
            let twoList = [];

            for (
              let j = 0;
              j < Count2List.length && twoList.length < lastObj.list.length;
              j++
            ) {
                // @ts-ignore
              twoList.push(Count2List);
            }

            for (
              let j = 0;
              j < Count3List.length && twoList.length < lastObj.list.length;
              j++
            ) {
              if (j >= i && j <= i + lastObj.list.length - 1) {
                continue;
              }
              // @ts-ignore
              twoList.push(Count3List[j].slice(0, 2));
            }

            if (twoList.length === lastObj.list.length) {
              let poker = [];
              let list = [];
              for (let j = 0; j < lastObj.list.length; j++) {
                // @ts-ignore
                poker = poker.concat(Count3List[i + j]);
                poker = poker.concat(twoList[i]);
                let threeOne = {
                  three: Count3List[i + j],
                  two: twoList[i],
                };
                // @ts-ignore
                list.push(threeOne);
              }

              // @ts-ignore
              obj = {
                type: type,
                poker: poker,
                list: list,
              };
            }
            break;
          }
        }
      }
    } else if (type === "oneList") {
      if (Count1List.length >= lastObj.list.length) {
        for (let i = 0; i < Count1List.length - lastObj.list.length + 1; i++) {
          if (
            Count1List[i][0].number > lastObj.list[0].one[0].number &&
            Count1List[i][0].number + lastObj.list.length - 1 ===
              Count1List[i + lastObj.list.length - 1][0].number &&
            Count1List[i + lastObj.list.length - 1][0].number <= 14
          ) {
            let list = Count1List.slice(i, i + lastObj.list.length);
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: list.flat(1),
              list: list.map(function (item) {
                return {
                  one: item,
                };
              }),
            };
            break;
          }
        }
      }
    } else if (type === "twoList") {
      if (Count2List.length >= lastObj.list.length) {
        for (let i = 0; i < Count2List.length - lastObj.list.length + 1; i++) {
          if (
            Count2List[i][0].number > lastObj.list[0].two[0].number &&
            Count2List[i][0].number + lastObj.list.length - 1 ===
              Count2List[i + lastObj.list.length - 1][0].number &&
            Count2List[i + lastObj.list.length - 1][0].number <= 14
          ) {
            let list = Count2List.slice(i, i + lastObj.list.length);
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: list.flat(1),
              list: list.map(function (item) {
                return {
                  two: item,
                };
              }),
            };
            break;
          }
        }
      }
    } else if (type === "threeList") {
      if (Count3List.length >= lastObj.list.length) {
        for (let i = 0; i < Count3List.length - lastObj.list.length + 1; i++) {
          if (
            Count3List[i][0].number > lastObj.list[0].two[0].number &&
            Count3List[i][0].number + lastObj.list.length - 1 ===
              Count3List[i + lastObj.list.length - 1][0].number &&
            Count3List[i + lastObj.list.length - 1][0].number <= 14
          ) {
            let list = Count3List.slice(i, i + lastObj.list.length);
            // @ts-ignore
            obj = {
              type: type,
              // @ts-ignore
              poker: list.flat(1),
              list: list.map(function (item) {
                return {
                  three: item,
                };
              }),
            };
            break;
          }
        }
      }
    }

    return obj;
  }

  sortFunction(a: { number: number }, b: { number: number }) {
    return a.number - b.number;
  }

  sortArray(a: { number: number }[], b: { number: number }[]) {
    return a[0].number - b[0].number;
  }

  sortList(a: { number: number }[][], b: { number: number }[][]) {
    return a[0][0].number - b[0][0].number;
  }
}

export default AI;
