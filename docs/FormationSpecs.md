# 隊列: Formation

## 狙われ率: Presence

基礎ヘイト値が上から N / N -1 / N -2 / ... 1 と振られる。
基礎ヘイト値に対して、 挑発などのスキルによって、ヘイト値に倍率が掛かる。

単体スキルで狙われる確率 = PT内の自身のヘイト値 / 味方の合計 Presence 値
列指指定スキルで狙われる確率 = その列の Presence の合計 / 味方の合計 Presence

例:
4列での1列目の命中率は 4/(4+3+2+1) = 40%
4列で、挑発状態(x2)の1列目の命中率は 8/(8+3+2+1) = 57%

## 味方の隊列

一列。

## 敵の隊列

前・中・後の3列。列ごとに3枠。3x3。

例: `[ ['goblin', 'goblin', 'goblin'], ['goblin-leader'], ['goblin-mage', 'goblin-archer'] ]`

## ターゲットタイプ

- 敵単体: SINGLE_OPONENT
- 敵単体指定: SINGLE_OPONENT_TARGETED
- 敵単体低体力: SINGLE_OPONENT_LOW_LIFE
- 敵単体高体力: SINGLE_OPONENT_HIGH_LIFE
- 敵単体プレゼンス無視: SINGLE_OPONENT_NO_PRESENCE
- 敵単体プレゼンス反転: SINGLE_OPONENT_REVERSED_PRESENCE
- 敵一列: ROW_OPONENT
- 敵一列プレゼンス無視: ROW_OPONENT_NO_PRESENCE
- 敵一列プレゼンス反転: ROW_OPONENT_REVERSED_PRESENCE
- 敵全体: ALL_OPONENT
- 敵全体減衰: ALL_OPONENT_DIMINISHING
- 自身: SELF
- 味方単体: SINGLE_ALLY
- 味方単体指定: SINGLE_ALLY_TARGETED
- 味方全体: SINGLE_ALLY
- 味方単体低体力: SINGLE_ALLY_LOW_LIFE
- 味方単体高体力: SINGLE_ALLY_HIGH_LIFE
