export default [
    {
        scene: 'village.jpg',
        member: [
            { name: "リンディ", name_id: "player1", hp: 15, c_hp: 15, mp: 15, c_mp: 15, },
            { name: "ソラ", name_id: "player2", hp: 13, c_hp: 13, mp: 14, c_mp: 14, },
            { name: "エリン", name_id: "player3", hp: 15, c_hp: 15, mp: 15, c_mp: 15, },
            { name: "ケイン", name_id: "player4", hp: 15, c_hp: 15, mp: 15, c_mp: 15, },
        ],
        lines: [
            [
                ["ナレーション",0,"TRPGのオンラインセッションログをノベルゲーム形式で表示します。\n（注：このサンプルのログはAI生成したものになります。）",,],
                ["ナレーション",0,"ナレーションはこのようにグレー文字で表記されます。",,],
                ["GM",1,"村の広場に、旅の冒険者であるあなたたちが集まっていました。村人たちは恐怖に満ちた目であなたたちを見つめています。",,],
                ["ケイン",0,"「この村、何か様子がおかしいな。村人たちが怖がっている。」",,],
                ["リンディ",0,"「うん、気がついた。何か困っていることがあるのかもしれないな。」",,],
                ["ソラ",0,"「私たちが何か手助けできることがあるかもしれないわ。話を聞いてみる？」",,],
                ["エリン",0,"「私もそれに賛成。何かできることがあるかもしれないから。」",,],
                ["GM",1,"そんなやりとりを交わしていると、そこへ村長と思わしき白髪の男性がゆっくりと歩み寄ってきます。",,],
                ["村長",1,"ああ、冒険者たちよ、私たちの村は困っておるんじゃ。ゴブリンが村を荒らしてしまってな…",,],
                ["ソラ",0,"「ゴブリンが、ですって！それは大変ですね。私たちに何か出来ることはありますか？」",,],
                ["村長",1,"そう言ってくれるとはありがたい。ゴブリンの巣窟を見つけて退治してくれたら…",,],
                ["リンディ",0,"「それなら任せておけ。我々が退治してみせる。」",,],
                ["ケイン",0,"だけどリンディ、どうやってゴブリンの巣窟を見つけるの？",,],
                ["リンディ",0,"それが問題だな…エリン、何か手立てはあるか？",,],
                ["エリン",0,"水晶の魔法でヒントを得られないかな？MPを3点消費して、水晶玉に道を聞いてみます。",,],
                ["GM",1,"ダイス2個を振って、発動判定をお願いします。",,],
                ["エリン",0,"発動判定 ... @2 @5",,-3],
                ["エリン",0,"結果は7です。",,],
                ["GM",1,"エリンの手に握られた水晶がふわりと浮かび上がり、柔らかな光を放ちながら東の森を指し示します。",,],
                ["エリン",0,"村の東にある森の中、そこに何かがあるわ。",,],
                ["ケイン",0,"森の中なら私のスキルで足跡を探すなり出来そうだ。",,],
                ["リンディ",0,"よし、準備を整えてからいこう。",,],
                ["GM",1,"この村は行商人たちが必ず立ち寄るポイントにある村で、武器や防具、薬草などは揃っています。",,],
                ["ソラ",0,"私は回復魔法を得意としているけれど、何が起こるかわからないから、回復薬も必要だわ。",,],
                ["ナレーション",0,"冒険者たちは村の武器商人や薬草屋を訪れ、武器防具の補強、回復薬やマジカルハーブを購入しました。",,],
                ["エリン",0,"準備万端ね。次にこの村を訪れるときは、ゴブリン退治の成功者として帰ってくるわ。",,],
                ["ケイン",0,"そうだな、それが俺たちの目指すところだ。さあ、水晶が示した方向へと進もう。",,]
            ],
        ]
    },
    {
        scene: 'forest.jpg',
        member: [
            { name: "リンディ", name_id: "player1", hp: 15, c_hp: 15, mp: 15, c_mp: 15, },
            { name: "ソラ", name_id: "player2", hp: 13, c_hp: 13, mp: 14, c_mp: 14, },
            { name: "エリン", name_id: "player3", hp: 15, c_hp: 15, mp: 15, c_mp: 12, },
            { name: "ケイン", name_id: "player4", hp: 15, c_hp: 15, mp: 15, c_mp: 15, },
        ],
        lines: [
            [
                ["GM",1,"水晶が示す方向に歩を進める冒険者たち。森の密度が増し、不自然な沈黙が広がっています。と、そのとき…",,],
                ["GM",1,"ケイン、罠感知スキルで判定してください。",,],
                ["ケイン",0,"罠感知スキル ... @3 @1",,],
                ["ケイン",0,"これは失敗だな…。",,],
                ["GM",1,"ケインの罠感知が失敗、ふと足元に引っかかる何かが…。突然の石の雨がリンディに襲いかかります。",,],
                ["リンディ",0,"うっ！予期せぬ攻撃…。HPが5点減少した。",-5,],
                ["ソラ",0,"リンディ、大丈夫？回復魔法を使うわ。",,],
                ["ソラ",0,"発動判定 ... @5 @3",,-5],
                ["ソラ",0,"成功！5点、回復するわ。",,],
                ["リンディ",0,"",5,],
                ["リンディ",0,"ありがとう、ソラ。元気を取り戻した。ケイン、次は失敗しないようにな。",,],
                ["ケイン",0,"うーん、すまない。次はきちんと罠を見つけるよ。では、探索スキルで周囲を見てみる。",,],
                ["ケイン",0,"探索スキル ... @6 @5",,],
                ["ケイン",0,"成功だ！",,],
                ["GM",1,"ケインの探索が成功し、ゴブリンたちの足跡や生活跡が見つかります。その足跡が集まり、一つの穴へと続いていることに気付きます。",,],
                ["リンディ",0,"あれがゴブリンの巣窟か…。",,],
                ["ケイン",0,"あの穴の入り口に立つ影、見張りかもしれない。",,],
                ["エリン",0,"それならば、私が先手を打つわ。見張りを眠らせる魔法を使います。",,],
                ["エリン",0,"発動判定 ... @1 @6",,-3],
                ["エリン",0,"魔力を足して達成値は12。",,],
                ["GM",1,"エリンの眠りの魔法により入り口に立つ影はバタバタと倒れた。",,],
                ["ソラ",0,"成功したみたいね、エリン。いい仕事をしたわ。",,],
                ["リンディ",0,"見張りを制圧できたみたいだな。",,],
                ["エリン",0,"ありがと、リンディ。でもこれからが本番ね。",,],
                ["ケイン",0,"本当にそうだな。一体何が待ち構えているのか、全く予想がつかないよ。",,],
                ["ソラ",0,"でも私たちは一緒に戦える。だから大丈夫、ね？",,],
                ["リンディ",0,"その通りだ、ソラ。何が起ころうとも、私たちは共に戦う。さあ、ゴブリンの洞窟、探索しようじゃないか。",,],
                ["GM",1,"勇敢な冒険者たちは、未知なる危険を前に一歩を踏み出しました。洞窟の中はどんな挑戦をもたらすのか...",,],
                ["GM",1,"その答えを見つけるため、彼らの冒険は続きます。",,]
            ],
        ]
    },
]