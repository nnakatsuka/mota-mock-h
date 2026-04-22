import { useState } from "react";
const FACE_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACeAKgDASIAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAABQMEBgcAAggBCf/EADwQAAEDAwMCBAQEBAUEAwEAAAECAwQABREGEiExQQcTUWEUInGBMkKRoQgVI7EWUsHR8DNTYnIkQ4Lh/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQBAgUABv/EACcRAAICAgICAQQCAwAAAAAAAAABAhEDIRIxBEEiExQyUQVhI0Jx/9oADAMBAAIRAxEAPwC7lWll7lbh596Qc05CJyobqOPRVJJKeablS0HBHFM0jL+nD2gP/h2ADy2D9q8Nggf9lH6UbSoKGa8UOa6l+jvpx/QCVYbf/wBhH6VobDbz/wDQn9KOqTSZRXcYkcI/oBL05bVDHkp/Smz2lLaocNJ/SpKRitHCAnkVVwi/RV4o/ohEzSUXJCBj6U3TpWY188Z1YxyKmT6SpzcAcewolAjKUjcUkDtkUN4INlHgg/RAoydQw1bcFxI9qNQ7zKbAElrb9qlHlJ53IH6U3mRozqCktj9KmONx6ZVYXDpgGdeGXWcAgE080ixvHnHuc0CvdtR5wDJIyelSLTkSREjozmui5cqZMXLlslSEAggjINeBjy1b0DFJMyNo+enrSwsZFFGlTNo7vQK4xT1IBFNFM7uR1r1hxaF7Vg4zUPZZP9heC95aglXKafSkoWyVcdM5oFJlNR2C4pXGMimlonT7g44gjYzngnuKq17L/WUfiAryzJXe2n2yUtAnee1ZUrnQEOxVMgYGOtZUCcsUovXsFKHFNXW0qGCOtOVUivpRRkYOsqQcp55rUKOfmp4qkXEBX1rirQkOa8VwDWjhU2c9qjur9VRLFDy6Qt9Y+RsHr9ahnJNukHJUhmO0XX3UNNjqpZwBUO1Dqt5pSBa2FyEqH40oyB+vFV5db09epIdubjkpnd8rQVhCD0GfWnUKyqL6ELQ4FDC8ONbkFJ6bTgcYobm5fiMQxKO5ByXri8NzAmG860nAC90VJBPfGecVMtL6ju12SUfzF2M9kbW1pGP3H7YqJt6Gjz3EuRXHIzwTlKCBtVnPHtn6VM9MabmWyOrzEBYSrcFZweB2qiU72H+FaJXbWr824kS/g5LZSML+Gzn6qBGP0o5MtMR1on4by1Ec7Tj9jUVa1Si0soElsqZ3H+snjAzgbhn/AJ+1HRfYN1TiJJZMhHBbUcdParXQNxi0Q66QW0XRCDLjDK9qUrcCVE/Q1JYrJaaShaSk47igepbU1eW3nEbostsEeU4nch3p+E1ErPqC+aaeMW4svPQwclpY3LA7ls85HtUfU4vZVePFq4vZaHkIV1paO3tOM8ZphZLrCu0RMmC8HWz3FE0nFG76AONMWPypprcZ8eNHW4sgKSO9aSZQILaDk9yKELh/E3NlEgFTO8FSCev1qKBZJtKojGDNn3ecFKbUmH+VR71PLeltDIS0ABiiDUKIuKlCW0BOMDHahsmO5AUpacqbqlhMeGWJXJ2by3yy2VqOE96yohf709NV8HAG5SuCewrKo5NdCeby2pVBWE1UkvpSpFJrHFMDwgritFE0qvFJgZUAelSVYPuiZDkVxEXh3H4j0T6VSmqNNzJ10lKm3UuvNgqSlSs4T9B9qsTxR1YqyW5cSEUuSCAr/wBef9uaqSxX+ZL1KwS2hbxyokZyPXp2PoaDOaXYbDF+g74eW+E9LXDGyYrG9KAcFSe4Hr7VbVpcskSKGZJ8kNdN6SFt+mQen24qHNWa3RZImMRvIfUSsFpOCM9Rjv34zzQHWNxuLaG40han2l7i08rhRHofcf6UuvIiuh77aT7HPiBribaLtIiQ0pWx+VBwMA/mSRyk+3Q46VIdD61RebGmJclB4uJCCMErTxzuHoOORz+lUtdyt8BmatSlYGFLSVAoPQ5HP2oz4fTkxLqWA5lbYy2lR/MOqc9+1R9xey32taCWtb9M0fcVIeXIlwircCpWXAnnCgoH5sDjkAnA55NN3tTR2nErjBLmD5rDyAoHJHUAH6ZBGO+Oa91elFyL7MltAShRUlCSQpIPUc9R/aqeZmyrdqJ23vrdUyFHIKuiQfX6HIrlm5aKywcNo6Ss2vXJ9pRIuUceehYSVoVjek5IIHfgd+etSW//AA16tKf5fKUt5vCm2z+JQGOnY/8APaubhPc/kUNmOoqXDKniUnlWFEc//k/3qU2/xAbhwGWXkOBbQKmF78nBV+bGO3A9/wBiRyemDljtWi27PdJFrm+eQlpw8vtp6SU9CQP86evQEjrUrvGpkRYwW3hxK0BaSB1B9fSq/wBJOx9ShahNcXu/qNqKv6jKgMH7enant3mOSdOPhlpaZkVJCmjwVlJBWPYEFKhVpScYWhPyU+Da7RLrLqOI5FLz/wArhHQ9qN2CfCkOLdU4Ac8ZNVRpiPOucRLiI/lrPUE5zRC6WrUMCKX4y1oKefaojldXRkQ8idKVWkXaxMS2jclxJT16141d4sxamCfmHY1zG/4ia1huLjJt7kgJ43pSalfhl4jsSJXkX1K4kxRwEupKQfoaDj8zFknwXZeH8tjyTUOv+ltG3xItzU+lAG/k8VlbOyY0uH57TqSMZyDWU0xq4w6EVEUis8UovrSaulFGGJKGabyjsbVn8IBJ+1OiKHX1W22vFJwSkjP1qSDmLxu1j8DNc2qCpLysoTjO3tuqQ/w22lU+zv32enzXn3SlClDnaKpXxL/+frGUpSiWm1lAx6CukP4dwhOh4qEjAyTWT5MnxNfw4rmWQYTL6Clac8YxQq56cjyoq4j+NijuQQOUH1B9c1J47e4gAYNbSY6t4GQR60oos0rV7KLvWmn4y3YcpACmxltwDCFj9eme3aozGtEuLcvikIwEKHmtkkEHP/Oa6QuNviSIikykoIAzkjpVS3xxDd7DFhivSXWzjdt+X3SPUf2okSs3Hs2vFsXMityJEF5L4Ruaez8ix6E4xVN6+jrYUmQptpbsflQI5KCeQe9dKWwaqMFhUhSUthJ8yNsBB9uOn2qp/GzTiFpelwUobWnK1M8BXTOQO/2q7000wVc01RUq74tbj1oYZZj/ABLOVKayCo56Eknr7elNrmpxhlh/cTwncB0wABQVuT8O75q0ZkISpG5XYdenr/8A2iV0mFcFgIbUVuDKypWQTnAP+lFsWqiwvCzUz0Kf5iVhIayTuOPlAOQPf0qyY2s41wucabEZcdSp9KZAAyBt4wod/kJGf/CudbDMDALgKkpUlPfnPQ/6VYeltQRLFqBMRxClxZqkvuoUcfOFAnB9CCsfQ0SGT0weTGpKzqCxWn4SMiVDWSy4ncjd1waeSroXEFh1sKHQ570N0LeBOtqbUhXzw0bQo9VoyQFftRiZEbjp853CldkimFHWjCyYnidR6N7NbYDydz0ZoZ9qGa30pY58BxKIra3sZTgdDWzPx0s5YCmU02udw/kyPOnqW5jnCE5q2q2LycHCpR1+yrkW/wATrJHkNwHESYnPlocyVAfWsqRz/GKGpbkSLZ5zm0cnyiB+9ZQHkxrXIQl9utLIy11ikldaXXSC6eR6BibiutA9STGWoDqVqAJScfXFFJzgbaJUah92DksOIwCnOB7Zoc5OqQDLOtI5D1bhN+uEpRBSpRIPuSe1dC/w1SUSdDMlCgotuqbV7EH/AGxXPevWyJ0xDaslp5TZx2wc/wC9T/8AhTlKnvXfTrspxtkLbk7UqwVflI+nCazc0bibniyqS/s6VuupLVaE7HHy6+B/02huV98UpY9RRrs2T5bjJHZzvUYv07SmmWnnHYodfSglRGVY/v61EdNeJEK7ynW4cB5LbbgRnaepzg4644NLTbStD8FcqbLdvKUuRiNxAI429KiM+dHtCmG4EZp2VIWEt5AwCepP0qX2gLm2L+qnavkEHqKjrGnYb0tbjrZU4lR2Ek4TnGf7Chu3TDxUadlZ6i1R4isa3FmLWyMXAnehGPl/zD1HepOLZd75aUI1BDbW4SQFAc47H2qew7M2k5cQgkdFdafpjoSnG0YHSrzfJUVhHjduzk3xV8JptuZkXeChS2Sg70jkp9/71VqXFyrSW+jsc7SnHPHT+1d7XNtiRGXHdbCm1AggjrXIXjBpBzSeqnJLCSm3THPxAcJzyKLjn6Yvnxf7IgjLvl/1GyU4AUkemeR+4qTIcK9Pw7gclxh1SEKxzjIO0/XBx96FToB8l9tMcec02Ujy/wA2FApV+ho75a4XhhDdSjzVvzmxkjISQF4HuaIBS0dC+A09126XFxxCipuO2gnHOcDAPvwatJbe93zpbnJPAzVUeEE34SyP3EsKD1wkFQ2jOQkbM/qkn71Z1qjrkOCTLKj3Sk9BWhidKjz3lZeeZpbD0AFxADYATitpUGARmSEKPoaF3fUEK2MEuPNtpA7qFBW9TwJzZdbeStI9D1q9opLJBabQ+m6Wts58rTHQU9cJAx96yoVqXxUY0+55YgyVD1SnNZS054k9iMs3ip7LYXTZ1SUAlVOlcUPmKyk54pz0a0nSBF0cW8cDpQ5MVbighA70WLfmL2pGafx4qWUjjJqiVgFHk9nEfi9F/lWtrq0lCg26+vqONwUc/wBx+1PP4bHzB8WW2yrDcyK4gHPXoof2qxP4qtNLaUm9R28oW4FqOOisBKv1ASfsapDRtyNm1XbbklWPhJKHPqgn5h+maQzKm4mz40umdfxNKylXCfLeXHkszgW1IdSThHp9+TT+xaPtdndWuHDbaK1ZUoDJJ+/OKkUBxpyO042oFK0hSSOhBp5tzyTxSbTo2FS2Zbm8RnUgY4oS55kaSrCCpJ5OK9uOpbXZn40SfLbYclqKGAs43q64HvUau+qLtGvjLLFkVKgrUEuv+cApAP5gnHIH1BqrkqQSEG7ZNrdKZltbm1ZI6juK3fAAoLZSVyXZCELbbXggEYz74ou6rI96hSdbJlHi6BMo/PzUS17p2Hqa0O26WgEKHyqxyk1LZQ+Y0NkAoUc+vFQ2WrRzUzph+0XGVFuqw2yhPk+cD+IFKgD+woDE86X/ACbTVvkOyFCYp8IHQvKO1vHpwMn/ANqvbxatonaPujbDIU8Yyyn1JAz/AKVVX8NMEMXb/Fs1plcaKFoa/qpK0vcZJTnIwOhNN4Pk7Zk+dkWGGjqTTWnoWnNL2+C9sLseOlCle/c/rmtlOP3AqaivFIzjgVCl6okXmUpQVsZ9z1FEI2rmba8GgFK90pyK0VNHlZZ4SlvSH87w2jXR7zLpJceTnO1S+P0o9Z9KaetMby0NshKRjigxvU25ozHK0g9yCKjmtF3ODaHJCZ6kqwTXOSSsr/ix3KMAtrZnTslKo6Wmlq7hIFZUG0ja5cyzrnzJZJcyoHrWUtP5O6FZrm+VdnQTpASSaDSnC675aORTyc8VqLaOntWQ43ljeoDdTzNmXydI1ixw0jceVGlFHit3DSLnQ4qUWSoiuvbXEvtnftk1ALbowD3SfWuSPETw4vOlpa5CY7j8BKspeQM7QexrsS5AreCfek34bD8VTMhpDraxtWlQyCPpQcmNT2Xx5ZQZAP4dNYf4g0sm1THB8fbEJbPPK2sfIr9Bg/SrbSrcAKp1rw0VprVzOp9FufDkK2y4C1Hy3WyfmCT2PcdqtaI+CAoEfrWXnxvE7Zu+J5CzRr2jS5WSHcHWnJCUkNK3AFIOD6g9qyeIMVAUUowngYHNCNW3/wDlzCWUb1OOqwkAEk0HjQb5cG1KddaiMqIIIG9z/YUunH0jTx4nJcpSpEpbulvSkAPoQfQ8GlESmpKCtpxKwOPlOaij+lYTg2yS/IJOVbnDg/ajVut8C3NeXFYSwjGAlBwP0qrZEowj+LFpDgA3dOaD3N4JJOeMZp1cHsI44FV/r/UjVshO5V/UxhIz3qE70Q2qtjTXV/bahSGmVBThbUEj3xXHtyU/FuThjPOI847iEEjByQR+uavFmS9IkLlznfylXJ4GelArXoiwJvXxN8nvvrccK2okdQSlKCc/Mo8557Vp+Hik9IxfPyrTZMvB92DpnSjSZU2ROvE75nYrBLxbR2ASnOD6mru8Krnp3WkCSphp1qTAcDchp5koUhR+v3rnLXV+mabdiWDS8BuCmaUpb8gYKyTjlXVRz6mrt0NKm2aYuMiSj4OKG4khw9VuBsKUs+5UrrWtwUlxS6POTST5SXZcLVshNI2oVgAdhUO8QrWzOgqjocUQSMgelOblcJjMUOIdzu6EHtQEXttsP/GKzn1pd1dMDlyxfxoGrU7AsXwkQgo/CkAc1lBbzMkiM89EWnKslIAzWUrke9A9F+xWSf6iqXX6A1ucAYHAFJKp410qNFg0i5wDTg803f4SfpXHMCyvmk/Q0y1BebfYbW7cLnJQww2MkqPJ9hTTWOo7bpuE7NnupTtGUpJ61yh4l+IM/XcyXtdUmAyrY02DwfeuqlYPt0h94t+Ol6vspy1aclm1wCdu5v8A6rg9z2H0op/Dn4uotGNJ6knOKbW6TDlOnhJUeUKPoTyCfWqAMRcaWouYPUpOaTeyRkdfWk8sfqKmP+PJ4ZKUT6OJVFllMohCvkwCDSqGHFfKlZwTxiuR/BbxxcsDCLHqlTj8RACWZONykDsFeoHrXUOkNZ2K8wRKts+PIaI4KVjisfJiljdM38eeORXEkaIoS18xJVjrTeUlKSSpWABQ29awtFtYLkmcy2B1yoVUHiB4221iO41aVGS+QQkJHH3qFFy0iXNR3Jku8QtWwbMwsrdAKR0zVAXTU7l8ua5clflx2sqAV0A9TUO1DqK7X2YuXcXVBOcpRngUDXcHEKKW14SfxDsfrT+LxaW+zNy+Y26XQWu+pHrjcdyFqaiNHLaPU9iaZL1HLTLDyXFZSQU89MUnEYt1xdShyYi3KOAVbCpH1wOR/wA6VJImn9PQJDTcWNL1PPWR5TDbqG0LJ9UJJcI+4rQxwaVRMzJkUpXIK6J1bp6VqS13fVyXyq17lsFBylR6gKHseeKt7U9yUvQYt0YFi9anfcdiNOfKtO8fJnuPlA+5qurboK26dlo1HrX4Rl3f5jFljHchKuwcVk8f+P70Y0I3cdYeKr+rboFJgWiMpTORhG8jCUj9SfsKax8kqYjk4ydr0HPCjxAudtlo0J4iMvw7knaIrr3O4H8Iz3qd6j+EekoYJyAeQOK81VbLTfrG5d5UVhyQ2ttUaTsBWkNncNquuCc/rTXVcYlHxjOUpCUqUUjnBHWq5oPg2J5altIYahuMe3QVNJDaUqTwAMqrKg9+ecfWr4cLVj8yuSaysqWRtkWdinrSa80uoYpNQrTNYRwaA60vsexWtT7hCnVA+W3nrj/Sj7nAzVB+KF5Vd7lMcadT5DSyw0M9QOpH3zVoRtgskuK0c7+NPiLc9R3qTE81aGEqKSM9ajtjbKLG2N21biytXqRWeKdrEDUJfb3FqSndk/5u4rW3upMBtIwAlAHX2oMr5Ow8UuCoa3WHvVvb6jqRQZTpQotrwD61IlOqQnjBHvTR5qG+rLrICh3TxQ2FToCoilwKcUr6Y708s15vFjdKrdMejhXXarANP0sRNgR8wA962+GhlOCnPuTVXG0WU2uiTW95y9st3C53p0sKH4HXedw6j6Vpc3LfGO2MQ8cdRyP1qMhiE2BkFeOic8D7V4/J3dCAOwFDWFJ2FeVtG9xW4sFSSSKFrZeWflBJp55xx61oqSR6Ci6BOz20WkyZaBPkpisE/MrqrHsKsKBra0aShLhaQtqUvLGHZz4y859+w9hVcKdWrua1Tk96tGfHopKHJbDN2v8AcrosqlvqWVnPJPH09Kmlq13ItGkP5Og5kPAJGDyc8CoDZLdPvd0j2u0xlyZb6tqEp6Z9Sewq1n/D6y6futhsciUbhqGTLQ/KWlfyMNoypSQO44xk0bHyuwGRQSpl6yGEx9BxIRG3y46UHnuEgE/Whrsl4MQUuObAGm/MAGdyM4UDn2JopqF5AsKvw4KcY96ieonnjtQwpSCiLgKTnOduadaMzsUlxGI78llpttTafmSSfynkf3rK1eltOWcXYp3rebyOMCsrIyJKR0nR00s0ma3V1rwimzUGF4Wpu1ynEHCksrIPvg1yRfdUR7dYW0upQVqUSojk5NddXNIXCkIPRTah+1fPHV0px+YWFKUUNLIGfY4qVLigcocpIkV4vulrraVN3Jvz/wAyEoGFJV7Gq+bfiF9TcQOJaT+EKOcCtAgvqUlGEJHX1NKbEMo2tpwKFKXINCHE3W4BwBzim7gByrIFNDKUlwpUMjtWKcJ5HFDYVIVWoAfipPzVdMmvAnNYpOOBVS9HhJPWtSQPSvdhVxmvAgZrjtI8K1Y+XpXgQSec0oQEpJ7CkULW+sobOxPc9646zda0NjKj9hU68JtEI1W85cLu69EsrBwpaeFPL/yJP9zTTw00xDvuoExpZIYbQXXQn8SwOwNWRrbU0WywU2u025MZhhJShCQMAf70fHjVcpdC2bK/xj2Fb9rDTOgrW5E0zaocVQb2pWlALis+qupNQfwQfm37XFx1HcnC6ttrYlSucKUc/wBgf1qrrxcZd0mqckuqWc9zV1+B8NMLSPn5yqW+pZx2CcJx+370SE+c/wCgU4LHjb9ss/WNw8iz7itKAEkk5GKpbVeurrI1e3Gs7mVlzYABkHnAHvU58V5jjem5oSogoaznGetMf4SNLxLjqKdqicEvOQNqWEEZw4oH5vsBx7mi5G3LigWGEeNssTUumL4jTUR5sNykfCoU8hlJBSraM/L6ZzWVbktPmNecrv0rKFPw1J3YOWG3aP/Z";

const PHASES = {
  "登録": ["ログイン", "企業情報登録", "求人情報登録"],
  "ダッシュボード": ["ダッシュボード"],
  "応募者検索": ["応募者検索(カード)", "応募者検索(リスト)"],
  "応募者管理": ["応募者管理(カード)", "応募者管理(リスト)", "応募者詳細"],
  "メッセージ": ["メッセージ一覧", "チャット画面"],
  "求人・設定": ["求人管理", "求人編集", "設定"],
};

const NAV_ITEMS = [
  { id: "ダッシュボード", icon: "📊", label: "ダッシュボード" },
  { id: "応募者検索(カード)", icon: "🔍", label: "応募者検索" },
  { id: "応募者管理(カード)", icon: "📋", label: "応募者管理" },
  { id: "メッセージ一覧", icon: "💬", label: "メッセージ" },
  { id: "求人管理", icon: "📝", label: "求人管理" },
  { id: "設定", icon: "⚙️", label: "設定" },
];

// ===== Shared Components =====
function Sidebar({ active, onNavigate }) {
  return (
    <div style={{ width: 200, background: "#1A1A1A", color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #2C2C2A" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#E8593C", letterSpacing: 2 }}>MOTA</span>
        <span style={{ fontSize: 10, color: "#888", marginLeft: 6 }}>管理画面</span>
      </div>
      <div style={{ flex: 1, paddingTop: 8 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id || (item.id === "応募者検索(カード)" && (active === "応募者検索(カード)" || active === "応募者検索(リスト)")) || (item.id === "応募者管理(カード)" && (active === "応募者管理(カード)" || active === "応募者管理(リスト)" || active === "応募者詳細"));
          return (
            <div key={item.id} onClick={() => onNavigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: isActive ? 700 : 400, background: isActive ? "rgba(232,89,60,0.15)" : "transparent", color: isActive ? "#E8593C" : "#AAA", borderLeft: isActive ? "3px solid #E8593C" : "3px solid transparent" }}>{item.icon} {item.label}</div>
          );
        })}
      </div>
      <div style={{ padding: "12px 20px", borderTop: "1px solid #2C2C2A", fontSize: 11, color: "#666" }}>
        <div>スカウト残数</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#E8593C", marginTop: 2 }}>147<span style={{ fontSize: 11, color: "#888" }}> / 300通</span></div>
      </div>
    </div>
  );
}

function TopBar({ title, children }) {
  return (
    <div style={{ height: 56, background: "#fff", borderBottom: "1px solid #E8E6E1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>{children}</div>
    </div>
  );
}

function Tag({ children, color }) {
  const c = { orange: { bg: "#FFF3ED", text: "#E8593C" }, blue: { bg: "#EDF4FF", text: "#2E6FD4" }, green: { bg: "#EEFBF3", text: "#1D9E75" }, gray: { bg: "#F1EFE8", text: "#5F5E5A" }, purple: { bg: "#F0EDFE", text: "#534AB7" }, red: { bg: "#FCEBEB", text: "#A32D2D" } }[color] || { bg: "#F1EFE8", text: "#5F5E5A" };
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>{children}</span>;
}

function Btn({ children, primary, small, outline, danger, disabled, onClick }) {
  return <button onClick={onClick} disabled={disabled} style={{ height: small ? 32 : 40, padding: small ? "0 14px" : "0 20px", borderRadius: 8, border: outline ? `1.5px solid ${danger ? "#E24B4A" : "#E8593C"}` : "none", background: outline ? "transparent" : disabled ? "#D3D1C7" : danger ? "#E24B4A" : primary !== false ? "#E8593C" : "#F7F6F3", color: outline ? (danger ? "#E24B4A" : "#E8593C") : primary !== false ? "#fff" : "#5F5E5A", fontSize: small ? 12 : 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>{children}</button>;
}

function Field({ label, placeholder, type, required, wide }) {
  return (
    <div style={{ marginBottom: 14, width: wide ? "100%" : "auto" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#3D3D3A", marginBottom: 4, display: "flex", gap: 4 }}>{label}{required && <span style={{ fontSize: 10, color: "#E8593C" }}>必須</span>}</div>
      {type === "textarea" ? <div style={{ borderRadius: 8, border: "1.5px solid #D3D1C7", padding: 12, minHeight: 80, fontSize: 13, color: "#B4B2A9", background: "#fff" }}>{placeholder}</div> : <div style={{ height: 40, borderRadius: 8, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#B4B2A9", background: "#fff" }}>{placeholder}</div>}
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return <div style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "18px 20px", border: "1px solid #E8E6E1" }}><div style={{ fontSize: 12, color: "#8C8A82", marginBottom: 4 }}>{label}</div><div style={{ fontSize: 28, fontWeight: 800, color: color || "#1A1A1A" }}>{value}</div>{sub && <div style={{ fontSize: 11, color: "#B4B2A9", marginTop: 2 }}>{sub}</div>}</div>;
}

// Filter bar shared between list and kanban
function ScoutFilterBar({ open }) {
  if (!open) return null;
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #E8E6E1", padding: "12px 24px", display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
      {[{ l: "年齢", w: 80 }, { l: "エリア", w: 100 }, { l: "学歴", w: 80 }, { l: "免許/資格", w: 100 }, { l: "動画有無", w: 80 }, { l: "MSG", w: 60 }].map(f => (
        <div key={f.l}><div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{f.l}</div><div style={{ height: 28, width: f.w, border: "1px solid #ccc", borderRadius: 4, display: "flex", alignItems: "center", padding: "0 8px", fontSize: 11, color: "#aaa" }}>-</div></div>
      ))}
      <Btn small>検索</Btn>
    </div>
  );
}

// ===== SCREENS =====
function ScreenLogin({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#FAFAF8,#F0EFEB)" }}>
      <div style={{ width: 400, background: "#fff", borderRadius: 16, padding: 40, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #E8E6E1" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}><div style={{ fontSize: 32, fontWeight: 800, color: "#E8593C" }}>MOTA</div><div style={{ fontSize: 13, color: "#8C8A82", marginTop: 4 }}>企業管理画面</div></div>
        <Field label="メールアドレス" placeholder="admin@example.com" required /><Field label="パスワード" placeholder="••••••••" required />
        <div style={{ marginTop: 8 }}><Btn>ログイン</Btn></div>
      </div>
    </div>
  );
}

function ScreenCompanyReg({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}><TopBar title="企業情報登録（Step 1 / 2）" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}><div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} /><div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8E6E1" }} /></div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <Field label="企業名" placeholder="株式会社サンプル" required wide /><Field label="所在地" placeholder="東京都新宿区" required wide /><Field label="業種" placeholder="選択 ▼" required wide /><Field label="企業紹介文" placeholder="企業の理念やアピールポイント..." type="textarea" required wide />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}><Btn primary={false}>下書き保存</Btn><Btn>次へ</Btn></div>
        </div>
      </div>
    </div>
  );
}

function ScreenJobReg({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}><TopBar title="求人情報登録（Step 2 / 2）" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}><div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} /><div style={{ flex: 1, height: 4, borderRadius: 2, background: "#E8593C" }} /></div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <Field label="職種" placeholder="施工管理" required wide /><Field label="雇用形態" placeholder="正社員 ▼" required wide />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Field label="月給（下限）" placeholder="250,000" required /><Field label="月給（上限）" placeholder="350,000" required /></div>
          <Field label="勤務地" placeholder="東京都新宿区" required wide /><Field label="仕事内容" placeholder="具体的な業務内容..." type="textarea" required wide /><Field label="職場写真（6枚まで）" placeholder="画像をアップロード" wide />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}><Btn primary={false}>下書き保存</Btn><Btn>登録完了・掲載開始</Btn></div>
        </div>
      </div>
    </div>
  );
}

function ScreenDashboard({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="ダッシュボード"><div style={{ fontSize: 12, color: "#8C8A82" }}>株式会社サンプル建設</div></TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div onClick={() => onNavigate("応募者検索(カード)")} style={{ flex: 1, cursor: "pointer" }}><StatCard label="スカウト残数" value="147" sub="/ 300通" color="#E8593C" /></div>
          <div onClick={() => onNavigate("応募者検索(カード)")} style={{ flex: 1, cursor: "pointer" }}><StatCard label="今月の応募数" value="12" sub="先月比 +3" color="#2E6FD4" /></div>
          <div onClick={() => onNavigate("応募者管理(カード)")} style={{ flex: 1, cursor: "pointer" }}><StatCard label="選考中" value="5" color="#534AB7" /></div>
          <div onClick={() => onNavigate("応募者管理(カード)")} style={{ flex: 1, cursor: "pointer" }}><StatCard label="今月の採用数" value="2" color="#1D9E75" /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>最近のスカウト応答</div>
            {[{ n: "田中 太郎", s: "応諾", c: "green", t: "2時間前", to: "応募者詳細" }, { n: "佐藤 花子", s: "面談済み", c: "purple", t: "昨日", to: "応募者詳細" }, { n: "鈴木 一郎", s: "辞退", c: "gray", t: "2日前", to: "応募者詳細" }].map((i, idx) => (
              <div key={idx} onClick={() => onNavigate(i.to)} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: idx < 2 ? "1px solid #F1EFE8" : "none", cursor: "pointer", borderRadius: 4 }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span style={{ fontSize: 13, color: "#2E6FD4", fontWeight: 500 }}>{i.n}</span><div style={{ display: "flex", gap: 8, alignItems: "center" }}><Tag color={i.c}>{i.s}</Tag><span style={{ fontSize: 11, color: "#B4B2A9" }}>{i.t}</span><span style={{ fontSize: 12, color: "#D3D1C7" }}>›</span></div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>未対応タスク</div>
            {[{ t: "面接日程を設定（山本さん）", to: "応募者詳細" }, { t: "AI面談結果を確認（3件）", to: "応募者詳細" }, { t: "未返信メッセージ（1件）", to: "メッセージ一覧" }].map((item, i) => (
              <div key={i} onClick={() => onNavigate(item.to)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px", borderBottom: i < 2 ? "1px solid #F1EFE8" : "none", cursor: "pointer", borderRadius: 4 }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: "#E8593C" }} /><span style={{ fontSize: 13, flex: 1 }}>{item.t}</span><span style={{ fontSize: 12, color: "#D3D1C7" }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Scout Management - List

// ===== 応募者検索（スカウト候補者を探す）=====
function ScreenSearchList({ onNavigate }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [checkedNames, setCheckedNames] = useState([]);
  const toggleCheck = (name) => setCheckedNames(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  const rows = [
    { n: "山本 翔", age: 23, area: "東京都", edu: "高卒", cert: "普免", route: "スカウト" },
    { n: "木村 結衣", age: 26, area: "神奈川", edu: "大卒", cert: "-", route: "応募" },
    { n: "中村 大輝", age: 21, area: "埼玉県", edu: "高卒", cert: "-", route: "スカウト" },
    { n: "松田 翼", age: 24, area: "千葉県", edu: "高卒", cert: "普免", route: "応募" },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募者検索">
        <span style={{ fontSize: 11, color: "#888" }}>残数 <strong style={{ color: "#E8593C" }}>147</strong>/300</span>
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div style={{ padding: "4px 14px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600 }}>リスト</div>
          <div onClick={() => onNavigate("応募者検索(カード)")} style={{ padding: "4px 14px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>カード</div>
        </div>
        <div onClick={() => setFilterOpen(!filterOpen)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: filterOpen ? "#1a1a1a" : "#F1EFE8", color: filterOpen ? "#fff" : "#5F5E5A", fontWeight: 600 }}>{filterOpen ? "▲ 閉じる" : "▼ 絞り込み"}</div>
      </TopBar>
      <ScoutFilterBar open={filterOpen} />
      <div style={{ padding: "12px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "8px 14px", background: "#EDF4FF", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div onClick={() => setCheckedNames(checkedNames.length === rows.length ? [] : rows.map(r => r.n))} style={{ width: 20, height: 20, borderRadius: 4, background: checkedNames.length === rows.length ? "#E8593C" : "#fff", border: "1.5px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800, cursor: "pointer" }}>{checkedNames.length === rows.length ? "✓" : ""}</div>
            <span style={{ fontSize: 12, color: "#2E6FD4", fontWeight: 600 }}>{checkedNames.length}件選択中</span>
          </div>
          <Btn small disabled={checkedNames.length === 0}>一括スカウト送信（{checkedNames.length}件）</Btn>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "30px 55px 80px 36px 60px 50px 55px 1fr 80px", background: "#F7F6F3", borderBottom: "1px solid #E8E6E1", fontSize: 10, fontWeight: 600, color: "#5F5E5A", padding: "8px 0" }}>
            <div style={{ textAlign: "center" }}><input type="checkbox" /></div><div>経路</div><div>氏名</div><div>年齢</div><div>エリア</div><div>学歴</div><div>資格</div><div>メモ</div><div>アクション</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 55px 80px 36px 60px 50px 55px 1fr 80px", borderBottom: "1px solid #F1EFE8", fontSize: 12, padding: "8px 0", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}><input type="checkbox" checked={checkedNames.includes(r.n)} onChange={() => toggleCheck(r.n)} /></div>
              <div><span style={{ fontSize: 8, padding: "2px 4px", borderRadius: 3, background: r.route === "応募" ? "#EEFBF3" : "#EDF4FF", color: r.route === "応募" ? "#1D9E75" : "#2E6FD4", fontWeight: 700 }}>{r.route === "応募" ? "📥応募" : "📩Scout"}</span></div>
              <div style={{ color: "#2E6FD4", fontWeight: 600 }}>{r.n}</div><div>{r.age}</div><div>{r.area}</div><div>{r.edu}</div><div style={{ fontSize: 10 }}>{r.cert}</div>
              <div><input placeholder="メモ" style={{ border: "1px solid #E8E6E1", borderRadius: 4, padding: "2px 6px", fontSize: 10, width: "90%", color: "#555" }} /></div>
              <div style={{ display: "flex", gap: 3 }}>
                <div style={{ padding: "3px 8px", borderRadius: 3, background: "#E8593C", color: "#fff", fontSize: 8, fontWeight: 700, cursor: "pointer" }}>スカウト送信</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 応募者検索（カード表示）=====
function ScreenSearchCard({ onNavigate }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [checkedNames, setCheckedNames] = useState([]);
  const toggleCheck = (name) => setCheckedNames(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  const qa1 = [{ q: "時間を忘れて取組んだものは？", a: "バレー部。毎日練習に参加した。" }, { q: "仕事経験は？", a: "カフェ接客半年、引越し事務3年。" }, { q: "特技は？", a: "パソコン入力が早い。" }];
  const allItems = [
    { name: "山本 翔", kana: "ヤマモト ショウ", age: 23, area: "東京都世田谷区", edu: "青山高校 卒", cert: "普通自動車免許", video: true, pc1: "#4a6a8a", pc2: "#7aa4c4", qa: qa1, route: "スカウト" },
    { name: "木村 結衣", kana: "キムラ ユイ", age: 26, area: "神奈川県横浜市", edu: "日本大学 卒", cert: null, video: true, pc1: "#8a5a6a", pc2: "#c48a9a", qa: [{ q: "取組んだものは？", a: "居酒屋バイトで接客にハマった。" }, { q: "仕事経験は？", a: "アパレル販売4年。" }, { q: "特技は？", a: "人の顔と名前を覚えるのが早い。" }], route: "応募" },
    { name: "中村 大輝", kana: "ナカムラ ダイキ", age: 21, area: "埼玉県さいたま市", edu: "埼玉工業高校 卒", cert: null, video: false, pc1: "#5a7a5a", pc2: "#8aaa8a", qa: [{ q: "取組んだものは？", a: "野球部。3年間続けた。" }, { q: "仕事経験は？", a: "工場で軽作業1年。" }, { q: "特技は？", a: "体力に自信がある。" }], route: "スカウト" },
  ];
  const genScoutMsg = (qa, name) => {
    if (!qa || qa.length < 3) return "";
    return `${name.split(" ")[0]}さん、はじめまして。プロフィールを拝見しました。${qa[0].a.slice(0, 30)}というご経験、${qa[2].a.slice(0, 20)}という強みに魅力を感じました。当社では未経験から手に職がつくポジションがございます。ぜひ一度お話しさせていただけませんか？`;
  };
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募者検索">
        <span style={{ fontSize: 11, color: "#888" }}>残数 <strong style={{ color: "#E8593C" }}>147</strong>/300</span>
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div onClick={() => onNavigate("応募者検索(リスト)")} style={{ padding: "4px 14px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>リスト</div>
          <div style={{ padding: "4px 14px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600 }}>カード</div>
        </div>
        <div onClick={() => setFilterOpen(!filterOpen)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: filterOpen ? "#1a1a1a" : "#F1EFE8", color: filterOpen ? "#fff" : "#5F5E5A", fontWeight: 600 }}>{filterOpen ? "▲ 閉じる" : "▼ 絞り込み"}</div>
      </TopBar>
      <ScoutFilterBar open={filterOpen} />
      <div style={{ padding: "12px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "8px 14px", background: "#EDF4FF", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div onClick={() => setCheckedNames(checkedNames.length === allItems.length ? [] : allItems.map(i => i.name))} style={{ width: 20, height: 20, borderRadius: 4, background: checkedNames.length === allItems.length ? "#E8593C" : "#fff", border: "1.5px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800, cursor: "pointer" }}>{checkedNames.length === allItems.length ? "✓" : ""}</div>
            <span style={{ fontSize: 12, color: "#2E6FD4", fontWeight: 600 }}>{checkedNames.length}件選択中</span>
          </div>
          <Btn small disabled={checkedNames.length === 0}>一括スカウト送信（{checkedNames.length}件）</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {allItems.map((item, i) => <SearchCard key={i} item={item} genScoutMsg={genScoutMsg} showCheck={true} checked={checkedNames.includes(item.name)} onCheck={toggleCheck} />)}
        </div>
      </div>
    </div>
  );
}

// Search Card (for 応募者検索)
function SearchCard({ item, genScoutMsg, showCheck, checked, onCheck }) {
  const [mode, setMode] = useState("photo");
  return (
    <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #e0e0e0", position: "relative" }}>
      {showCheck && <div onClick={() => onCheck && onCheck(item.name)} style={{ position: "absolute", top: 6, left: 6, zIndex: 10, width: 20, height: 20, borderRadius: 4, background: checked ? "#E8593C" : "rgba(255,255,255,0.9)", border: checked ? "none" : "1.5px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800, cursor: "pointer" }}>{checked ? "✓" : ""}</div>}
      <div style={{ position: "relative" }}>
        <div style={{ height: 120, background: mode === "photo" ? `linear-gradient(135deg,${item.pc1},${item.pc2})` : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {mode === "photo" ? <img src={FACE_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 18, color: "#fff" }}>▶</span>}
        </div>
        <div style={{ position: "absolute", top: 6, left: showCheck ? 30 : 6, background: "#E8593C", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>{item.area}</div>
        <div style={{ position: "absolute", bottom: 6, left: 6, background: item.route === "応募" ? "#1D9E75" : "#2E6FD4", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>{item.route === "応募" ? "📥 自己応募" : "📩 スカウト"}</div>
        {item.video && <div style={{ position: "absolute", top: 6, right: 6, display: "flex", background: "rgba(0,0,0,0.5)", borderRadius: 10, overflow: "hidden" }}>
          <div onClick={() => setMode("photo")} style={{ padding: "2px 8px", fontSize: 9, fontWeight: 600, background: mode === "photo" ? "#fff" : "transparent", color: mode === "photo" ? "#1a1a1a" : "#fff", cursor: "pointer" }}>写真</div>
          <div onClick={() => setMode("video")} style={{ padding: "2px 8px", fontSize: 9, fontWeight: 600, background: mode === "video" ? "#fff" : "transparent", color: mode === "video" ? "#1a1a1a" : "#fff", cursor: "pointer" }}>動画</div>
        </div>}
      </div>
      <div style={{ padding: "8px 10px" }}>
        <div style={{ textAlign: "center", marginBottom: 4 }}><div style={{ fontSize: 13, fontWeight: 800 }}>{item.name}（{item.age}）</div><div style={{ fontSize: 9, color: "#aaa" }}>{item.kana}</div></div>
        <div style={{ fontSize: 10, color: "#555", textAlign: "center", marginBottom: 6, lineHeight: 1.4 }}>{item.cert && <div>{item.cert}</div>}<div>{item.edu}</div></div>
        {item.qa && item.qa.map((q, i) => (<div key={i} style={{ marginBottom: 4 }}><div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}><span style={{ fontSize: 8, fontWeight: 800, color: "#fff", background: "#333", padding: "1px 4px", borderRadius: 2 }}>Q{i + 1}</span><span style={{ fontSize: 8, fontWeight: 700 }}>{q.q}</span></div><div style={{ fontSize: 9, color: "#555", lineHeight: 1.4, background: "#f8f8f8", borderRadius: 3, padding: "3px 6px" }}>{q.a}</div></div>))}
      </div>
      <div style={{ padding: "0 10px 8px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#2E6FD4", marginBottom: 3 }}>✨ スカウトコメント<span style={{ fontSize: 8, fontWeight: 400, color: "#aaa" }}> Q&Aから自動生成</span></div>
        <textarea defaultValue={genScoutMsg(item.qa, item.name)} style={{ width: "100%", minHeight: 56, borderRadius: 4, border: "1px solid #D3D1C7", padding: "4px 6px", fontSize: 9, color: "#333", lineHeight: 1.5, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
      </div>
      <div style={{ padding: "0 10px 8px" }}><div style={{ fontSize: 9, fontWeight: 600, color: "#8C8A82", marginBottom: 2 }}>📝 メモ</div><input placeholder="社内メモを入力..." style={{ width: "100%", border: "1px solid #E8E6E1", borderRadius: 4, padding: "4px 6px", fontSize: 9, color: "#555", boxSizing: "border-box" }} /></div>
      <div style={{ padding: "0 10px 8px" }}>
        <div style={{ padding: "6px 0", textAlign: "center", background: "#E8593C", color: "#fff", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>スカウト送信</div>
      </div>
    </div>
  );
}

// ===== 応募者管理（リスト表示）=====
function ScreenManageList({ onNavigate }) {
  const [tab, setTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const steps = [{ id: "all", l: "すべて", c: "#1a1a1a" }, { id: "s1", l: "STEP1 応募", c: "#E8593C" }, { id: "s2", l: "STEP2 面談", c: "#1D9E75" }, { id: "s3", l: "STEP3 結果", c: "#D4A02E" }];
  const rows = [
    { n: "田中 太郎", age: 25, area: "東京都", edu: "高卒", cert: "普免", step: "s1", status: "応諾", msg: true, route: "スカウト" },
    { n: "鈴木 一郎", age: 28, area: "東京都", edu: "大卒", cert: "FP2級", step: "s1", status: "一次通過", msg: false, route: "応募" },
    { n: "高橋 美咲", age: 20, area: "千葉県", edu: "高卒", cert: "-", step: "s2", status: "面談確定", msg: true, route: "応募" },
    { n: "渡辺 健太", age: 31, area: "埼玉県", edu: "専門卒", cert: "介護", step: "s3", status: "内定", msg: true, route: "スカウト" },
  ];
  const filtered = tab === "all" ? rows : rows.filter(r => r.step === tab);
  const stepC = { s1: "#E8593C", s2: "#1D9E75", s3: "#D4A02E" };
  const stepL = { s1: "応募", s2: "面談", s3: "結果" };
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募者管理">
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div style={{ padding: "4px 14px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600 }}>リスト</div>
          <div onClick={() => onNavigate("応募者管理(カード)")} style={{ padding: "4px 14px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>カード</div>
        </div>
        <div onClick={() => setFilterOpen(!filterOpen)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: filterOpen ? "#1a1a1a" : "#F1EFE8", color: filterOpen ? "#fff" : "#5F5E5A", fontWeight: 600 }}>{filterOpen ? "▲ 閉じる" : "▼ 絞り込み"}</div>
      </TopBar>
      <ScoutFilterBar open={filterOpen} />
      <div style={{ padding: "12px 24px" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 12, borderBottom: "2px solid #e0e0e0", overflowX: "auto" }}>
          {steps.map(s => {
            const cnt = s.id === "all" ? rows.length : rows.filter(r => r.step === s.id).length;
            return <div key={s.id} onClick={() => setTab(s.id)} style={{ padding: "8px 14px", fontSize: 11, cursor: "pointer", fontWeight: tab === s.id ? 700 : 400, color: tab === s.id ? s.c : "#888", borderBottom: tab === s.id ? `2px solid ${s.c}` : "2px solid transparent", marginBottom: -2, whiteSpace: "nowrap" }}>{s.l} <span style={{ fontSize: 10, background: tab === s.id ? s.c : "#e0e0e0", color: tab === s.id ? "#fff" : "#888", padding: "1px 6px", borderRadius: 8 }}>{cnt}</span></div>;
          })}
        </div>
        <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "30px 55px 80px 36px 60px 50px 55px 70px 55px 36px 1fr", background: "#F7F6F3", borderBottom: "1px solid #E8E6E1", fontSize: 10, fontWeight: 600, color: "#5F5E5A", padding: "8px 0" }}>
            <div style={{ textAlign: "center" }}><input type="checkbox" /></div><div>経路</div><div>氏名</div><div>年齢</div><div>エリア</div><div>学歴</div><div>資格</div><div>ステップ</div><div>ステータス</div><div>MSG</div><div>メモ</div>
          </div>
          {filtered.map((r, i) => (
            <div key={i} onClick={() => onNavigate("応募者詳細")} style={{ display: "grid", gridTemplateColumns: "30px 55px 80px 36px 60px 50px 55px 70px 55px 36px 1fr", borderBottom: "1px solid #F1EFE8", fontSize: 12, padding: "8px 0", cursor: "pointer", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}><input type="checkbox" onClick={e => e.stopPropagation()} /></div>
              <div><span style={{ fontSize: 8, padding: "2px 4px", borderRadius: 3, background: r.route === "応募" ? "#EEFBF3" : "#EDF4FF", color: r.route === "応募" ? "#1D9E75" : "#2E6FD4", fontWeight: 700 }}>{r.route === "応募" ? "📥応募" : "📩Scout"}</span></div>
              <div style={{ color: "#2E6FD4", fontWeight: 600 }}>{r.n}</div><div>{r.age}</div><div>{r.area}</div><div>{r.edu}</div><div style={{ fontSize: 10 }}>{r.cert}</div>
              <div><span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3, background: (stepC[r.step] || "#888") + "15", color: stepC[r.step], fontWeight: 600 }}>{stepL[r.step]}</span></div>
              <div><span style={{ fontSize: 9, padding: "2px 4px", borderRadius: 3, background: "#F1EFE8", color: "#5F5E5A", fontWeight: 600 }}>{r.status}</span></div>
              <div style={{ textAlign: "center" }}>{r.msg ? <span style={{ color: "#E8593C", fontWeight: 700 }}>●</span> : <span style={{ color: "#ddd" }}>-</span>}</div>
              <div><input placeholder="メモ" onClick={e => e.stopPropagation()} style={{ border: "1px solid #E8E6E1", borderRadius: 4, padding: "2px 6px", fontSize: 10, width: "90%", color: "#555" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 応募者管理（カード表示）=====
function ScreenManageCard({ onNavigate }) {
  const [tab, setTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const qa1 = [{ q: "時間を忘れて取組んだものは？", a: "バレー部。毎日練習に参加した。" }, { q: "仕事経験は？", a: "カフェ接客半年、引越し事務3年。" }, { q: "特技は？", a: "パソコン入力が早い。" }];
  const allItems = [
    { name: "田中 太郎", kana: "タナカ タロウ", age: 25, area: "東京都新宿区", edu: "新宿高校 卒", cert: "普通自動車免許", video: true, pc1: "#5a6a4a", pc2: "#8a9a7a", qa: qa1, step: "s1", route: "スカウト", extra: [{ t: "スカウト→応諾", bg: "#EDF4FF", c: "#2E6FD4" }], hasMsg: true },
    { name: "鈴木 一郎", kana: "スズキ イチロウ", age: 28, area: "東京都練馬区", edu: "明治大学 卒", cert: "FP2級", video: false, pc1: "#6a6a4a", pc2: "#9a9a7a", qa: [{ q: "取組んだものは？", a: "大学のゼミ活動。" }, { q: "仕事経験は？", a: "営業事務3年。" }, { q: "特技は？", a: "Excel・資料作成。" }], step: "s1", route: "応募", extra: [{ t: "応募→一次通過", bg: "#EEFBF3", c: "#1D9E75" }], hasMsg: false },
    { name: "高橋 美咲", kana: "タカハシ ミサキ", age: 20, area: "千葉県船橋市", edu: "船橋高校 卒", cert: null, video: true, pc1: "#6a5a3a", pc2: "#a48a6a", qa: [{ q: "取組んだものは？", a: "ダンス部。大会に向けて毎日練習。" }, { q: "仕事経験は？", a: "コンビニバイト2年。" }, { q: "特技は？", a: "明るく元気に挨拶できる。" }], step: "s2", route: "応募", extra: [{ t: "面談 4/14 10:00", bg: "#EEFBF3", c: "#1D9E75" }], hasMsg: true },
    { name: "渡辺 健太", kana: "ワタナベ ケンタ", age: 31, area: "埼玉県さいたま市", edu: "専門学校 卒", cert: "介護福祉士", video: false, pc1: "#7a6a3a", pc2: "#b49a6a", qa: [{ q: "取組んだものは？", a: "介護施設でのボランティア。" }, { q: "仕事経験は？", a: "介護スタッフ5年。" }, { q: "特技は？", a: "お年寄りとの会話。" }], step: "s3", route: "スカウト", extra: [{ t: "内定承諾", bg: "#FFF8E6", c: "#D4A02E" }], hasMsg: true },
  ];
  const steps = [{ id: "all", l: "すべて", c: "#1a1a1a" }, { id: "s1", l: "STEP1 応募", c: "#E8593C" }, { id: "s2", l: "STEP2 面談", c: "#1D9E75" }, { id: "s3", l: "STEP3 結果", c: "#D4A02E" }];
  const stepMap = { s1: "STEP1", s2: "STEP2", s3: "STEP3" };
  const filtered = tab === "all" ? allItems : allItems.filter(i => i.step === tab);
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="応募者管理">
        <div style={{ display: "flex", gap: 4, background: "#F1EFE8", borderRadius: 8, padding: 2 }}>
          <div onClick={() => onNavigate("応募者管理(リスト)")} style={{ padding: "4px 14px", borderRadius: 6, fontSize: 12, color: "#8C8A82", cursor: "pointer" }}>リスト</div>
          <div style={{ padding: "4px 14px", borderRadius: 6, background: "#fff", fontSize: 12, fontWeight: 600 }}>カード</div>
        </div>
        <div onClick={() => setFilterOpen(!filterOpen)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", background: filterOpen ? "#1a1a1a" : "#F1EFE8", color: filterOpen ? "#fff" : "#5F5E5A", fontWeight: 600 }}>{filterOpen ? "▲ 閉じる" : "▼ 絞り込み"}</div>
      </TopBar>
      <ScoutFilterBar open={filterOpen} />
      <div style={{ padding: "12px 24px" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 12, borderBottom: "2px solid #e0e0e0", overflowX: "auto" }}>
          {steps.map(s => {
            const cnt = s.id === "all" ? allItems.length : allItems.filter(i => i.step === s.id).length;
            return <div key={s.id} onClick={() => setTab(s.id)} style={{ padding: "8px 14px", fontSize: 11, cursor: "pointer", fontWeight: tab === s.id ? 700 : 400, color: tab === s.id ? s.c : "#888", borderBottom: tab === s.id ? `2px solid ${s.c}` : "2px solid transparent", marginBottom: -2, whiteSpace: "nowrap" }}>{s.l} <span style={{ fontSize: 10, background: tab === s.id ? s.c : "#e0e0e0", color: tab === s.id ? "#fff" : "#888", padding: "1px 6px", borderRadius: 8 }}>{cnt}</span></div>;
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {filtered.map((item, i) => <ManageCard key={i} item={item} step={stepMap[item.step]} onNavigate={onNavigate} />)}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#bbb", fontSize: 13 }}>該当者なし</div>}
      </div>
    </div>
  );
}

// Manage Card (for 応募者管理)
function ManageCard({ item, step, onNavigate }) {
  const [mode, setMode] = useState("photo");
  return (
    <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #e0e0e0", cursor: "pointer", position: "relative" }}>
      <div onClick={() => onNavigate("応募者詳細")}>
        <div style={{ position: "relative" }}>
          <div style={{ height: 120, background: mode === "photo" ? `linear-gradient(135deg,${item.pc1},${item.pc2})` : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {mode === "photo" ? <img src={FACE_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 18, color: "#fff" }}>▶</span>}
          </div>
          <div style={{ position: "absolute", top: 6, left: 6, background: "#E8593C", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>{item.area}</div>
          <div style={{ position: "absolute", bottom: 6, left: 6, background: item.route === "応募" ? "#1D9E75" : "#2E6FD4", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3 }}>{item.route === "応募" ? "📥 自己応募" : "📩 スカウト"}</div>
          {item.video && <div style={{ position: "absolute", top: 6, right: 6, display: "flex", background: "rgba(0,0,0,0.5)", borderRadius: 10, overflow: "hidden" }}>
            <div onClick={e => { e.stopPropagation(); setMode("photo"); }} style={{ padding: "2px 8px", fontSize: 9, fontWeight: 600, background: mode === "photo" ? "#fff" : "transparent", color: mode === "photo" ? "#1a1a1a" : "#fff", cursor: "pointer" }}>写真</div>
            <div onClick={e => { e.stopPropagation(); setMode("video"); }} style={{ padding: "2px 8px", fontSize: 9, fontWeight: 600, background: mode === "video" ? "#fff" : "transparent", color: mode === "video" ? "#1a1a1a" : "#fff", cursor: "pointer" }}>動画</div>
          </div>}
        </div>
        <div style={{ padding: "8px 10px" }}>
          <div style={{ textAlign: "center", marginBottom: 4 }}><div style={{ fontSize: 13, fontWeight: 800 }}>{item.name}（{item.age}）</div><div style={{ fontSize: 9, color: "#aaa" }}>{item.kana}</div></div>
          <div style={{ fontSize: 10, color: "#555", textAlign: "center", marginBottom: 6, lineHeight: 1.4 }}>{item.cert && <div>{item.cert}</div>}<div>{item.edu}</div></div>
          {item.qa && item.qa.map((q, i) => (<div key={i} style={{ marginBottom: 4 }}><div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}><span style={{ fontSize: 8, fontWeight: 800, color: "#fff", background: "#333", padding: "1px 4px", borderRadius: 2 }}>Q{i + 1}</span><span style={{ fontSize: 8, fontWeight: 700 }}>{q.q}</span></div><div style={{ fontSize: 9, color: "#555", lineHeight: 1.4, background: "#f8f8f8", borderRadius: 3, padding: "3px 6px" }}>{q.a}</div></div>))}
          {item.extra && <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 4 }}>{item.extra.map((e, i) => <span key={i} style={{ fontSize: 8, padding: "1px 5px", borderRadius: 3, background: e.bg, color: e.c, fontWeight: 600 }}>{e.t}</span>)}</div>}
        </div>
      </div>
      <div onClick={e => e.stopPropagation()} style={{ padding: "0 10px 8px" }}><div style={{ fontSize: 9, fontWeight: 600, color: "#8C8A82", marginBottom: 2 }}>📝 メモ</div><input placeholder="社内メモを入力..." style={{ width: "100%", border: "1px solid #E8E6E1", borderRadius: 4, padding: "4px 6px", fontSize: 9, color: "#555", boxSizing: "border-box" }} /></div>
      <div style={{ padding: "0 10px 8px" }}>
        {step === "STEP1" && <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <div style={{ flex: 1, padding: "5px 0", textAlign: "center", background: "#1D9E75", color: "#fff", borderRadius: 4, fontSize: 8, fontWeight: 700 }}>→STEP2 面談</div>
          <div style={{ flex: 1, padding: "5px 0", textAlign: "center", background: "#D4A02E", color: "#fff", borderRadius: 4, fontSize: 8, fontWeight: 700 }}>→STEP3 結果</div>
          <div style={{ flex: 1, padding: "5px 0", textAlign: "center", background: "#F1EFE8", color: "#888", borderRadius: 4, fontSize: 8, fontWeight: 600 }}>不採用</div>
        </div>}
        {step === "STEP2" && <div>
          <div onClick={e => { e.stopPropagation(); onNavigate("応募者詳細"); }} style={{ padding: "5px 0", textAlign: "center", background: "#1D9E75", color: "#fff", borderRadius: 4, fontSize: 9, fontWeight: 700, marginBottom: 4, cursor: "pointer" }}>📅 面談日程を設定</div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ flex: 1, padding: "5px 0", textAlign: "center", background: "#D4A02E", color: "#fff", borderRadius: 4, fontSize: 9, fontWeight: 700 }}>通過→STEP3</div>
            <div style={{ flex: 1, padding: "5px 0", textAlign: "center", background: "#F1EFE8", color: "#888", borderRadius: 4, fontSize: 9, fontWeight: 600 }}>不採用</div>
          </div>
        </div>}
        {step === "STEP3" && <div style={{ padding: "5px 0", textAlign: "center", background: "#D4A02E", color: "#fff", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>🎉 選考結果を報告</div>}
      </div>
    </div>
  );
}

function ScreenApplicantDetail({ onNavigate }) {
  const [tab, setTab] = useState("選考情報");
  const tabs = ["選考情報", "AI面談", "日程調整", "選考結果", "メッセージ"];
  const tabC = { "選考情報": "#E8593C", "AI面談": "#534AB7", "日程調整": "#1D9E75", "選考結果": "#D4A02E", "メッセージ": "#2E6FD4" };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FAFAF8" }}>
      <TopBar title="応募者詳細 - 田中 太郎">
        <Btn small primary={false} onClick={() => onNavigate("応募者検索(カード)")}>← 一覧に戻る</Btn>
      </TopBar>
      <div style={{ padding: "0 24px", flexShrink: 0 }}>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e0e0e0", marginBottom: 0 }}>
          {tabs.map(t => (
            <div key={t} onClick={() => setTab(t)} style={{ padding: "12px 16px", fontSize: 13, fontWeight: tab === t ? 700 : 400, color: tab === t ? tabC[t] : "#888", borderBottom: tab === t ? `2px solid ${tabC[t]}` : "2px solid transparent", marginBottom: -2, cursor: "pointer" }}>{t}</div>
          ))}
        </div>
      </div>

      {/* ===== 選考情報 TAB ===== */}
      {tab === "選考情報" && (
        <div style={{ flex: 1, padding: "20px 24px 24px", overflow: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
            {/* Left: Profile card */}
            <div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
                <img src={FACE_IMG} alt="" style={{ width: 80, height: 80, borderRadius: 40, margin: "0 auto 12px", objectFit: "cover" }} />
                <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 700 }}>田中 太郎</div><div style={{ fontSize: 12, color: "#8C8A82" }}>25歳 ・ 東京都 ・ 高卒</div></div>
                <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                  <Tag color="green">動画あり</Tag><Tag color="blue">普通免許</Tag><Tag color="purple">📩 スカウト</Tag>
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E8E6E1" }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>基本情報</div>
                {[["住所", "東京都新宿区"], ["学歴", "新宿高校 卒"], ["免許", "普通自動車免許"], ["登録日", "2026/04/01"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", fontSize: 12, marginBottom: 6 }}><div style={{ width: 60, color: "#8C8A82" }}>{k}</div><div>{v}</div></div>
                ))}
              </div>
            </div>
            {/* Right: Q&A + Status */}
            <div>
              {/* Selection pipeline */}
              <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #E8E6E1", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>選考ステータス</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[{ l: "新着", done: true }, { l: "STEP1 応募", done: true }, { l: "STEP2 面談", done: true }, { l: "STEP3 結果", done: false }, { l: "STEP4 内定", done: false }].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 11, background: s.done ? "#E8593C" : "#E8E6E1", color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.done ? "✓" : i + 1}</div>
                      <span style={{ fontSize: 9, color: s.done ? "#1A1A1A" : "#B4B2A9", fontWeight: s.done ? 600 : 400 }}>{s.l}</span>
                      {i < 4 && <span style={{ color: "#D3D1C7", fontSize: 10 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
              {/* Q&A */}
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Q&A回答</div>
                {[{ q: "得意なことは？", a: "人と話すのが得意で初対面でもすぐに打ち解けられます。" }, { q: "どんな職場で働きたい？", a: "チームワークを大切にする明るい職場で働きたいです。" }, { q: "仕事で大切にしていることは？", a: "時間を厳守し信頼関係を築くことを大切にしています。" }].map((i, idx) => (
                  <div key={idx} style={{ marginBottom: 14 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#8C8A82", marginBottom: 4 }}>Q{idx + 1}. {i.q}</div><div style={{ fontSize: 13, lineHeight: 1.6, background: "#F7F6F3", borderRadius: 8, padding: 12 }}>{i.a}</div></div>
                ))}
              </div>
              {/* Profile video */}
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>プロフィール動画</div>
                <div style={{ height: 180, borderRadius: 10, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", cursor: "pointer" }}>▶</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== AI面談 TAB ===== */}
      {tab === "AI面談" && (
        <div style={{ flex: 1, padding: "20px 24px 24px", overflow: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>AI面談サマリー</div>
                <div style={{ background: "#F0EDFE", borderRadius: 10, padding: 14, fontSize: 13, color: "#534AB7", lineHeight: 1.7, marginBottom: 14 }}>コミュニケーション能力が高く、質問に対して的確かつ積極的に回答。未経験ながら学ぶ意欲が強い印象。チームワークを重視する姿勢あり。</div>
                {[{ l: "コミュニケーション", s: 4 }, { l: "意欲・積極性", s: 5 }, { l: "論理的思考", s: 3 }, { l: "協調性", s: 4 }].map(i => (
                  <div key={i.l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><div style={{ width: 120, fontSize: 12, color: "#5F5E5A" }}>{i.l}</div><div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(n => <div key={n} style={{ width: 20, height: 20, borderRadius: 4, background: n <= i.s ? "#534AB7" : "#E8E6E1" }} />)}</div></div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>面談Q&A詳細</div>
                {[{ q: "これまでの仕事で一番やりがいを感じた経験は？", a: "飲食店のアルバイトで、常連のお客様から名前を覚えてもらえた時にやりがいを感じました。" }, { q: "施工管理に興味を持った理由は？", a: "ものづくりに関わる仕事がしたいと以前から思っており、建物が完成する過程に携われることに魅力を感じました。" }, { q: "チームで働く上で大切なことは？", a: "報連相を怠らないことと、相手の立場に立って考えることだと思います。" }].map((item, i) => (
                  <div key={i} style={{ marginBottom: 12 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#8C8A82", marginBottom: 4 }}>Q{i + 1}. {item.q}</div><div style={{ fontSize: 13, lineHeight: 1.6, background: "#F7F6F3", borderRadius: 8, padding: 10 }}>{item.a}</div></div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>AI面談動画</div>
                <div style={{ height: 300, borderRadius: 10, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 32, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "#fff", cursor: "pointer" }}>▶</div>
                </div>
                <div style={{ fontSize: 12, color: "#8C8A82", marginBottom: 16 }}>面談時間: 8分32秒 ・ 実施日: 2026/04/06</div>
                <div style={{ display: "flex", gap: 10 }}><div style={{ flex: 1 }}><Btn>面接に進める（→STEP3）</Btn></div><div style={{ flex: 1 }}><Btn outline danger>見送る</Btn></div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 日程調整 TAB ===== */}
      {tab === "日程調整" && (
        <div style={{ flex: 1, padding: "20px 24px 24px", overflow: "auto" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📅 面談候補日を登録</div>
              <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 16, lineHeight: 1.6 }}>候補日を最大3つ登録すると、求職者にSMS・メールで通知されます。求職者がアプリ内で選択し、確定します。</div>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", gap: 10, marginBottom: 10 }}>
                  <Field label={`候補${i} - 日付`} placeholder="2026/04/14" /><Field label="開始" placeholder="10:00" /><Field label="終了" placeholder="11:00" />
                </div>
              ))}
              <Field label="面接形式" placeholder="対面 / オンライン ▼" wide />
              <Field label="面接場所・URL" placeholder="東京都新宿区西新宿1-1-1 サンプルビル3F" wide />
              <Field label="備考（任意）" placeholder="持ち物や注意事項など" type="textarea" wide />
              <div style={{ background: "#EEFBF3", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "#1D9E75" }}>登録後、求職者にSMS・メールで通知されます。求職者が候補日から選択します。</div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}><Btn primary={false}>キャンセル</Btn><Btn>日程を登録する</Btn></div>
            </div>
            {/* 既存の調整状況 */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1" }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>日程調整の状況</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: "#1D9E75" }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>候補日提示済み — 求職者の回答待ち</span>
              </div>
              {["4月14日（月）10:00〜11:00", "4月15日（火）14:00〜15:00", "4月17日（木）10:00〜11:00"].map((d, i) => (
                <div key={i} style={{ padding: "8px 14px", marginBottom: 6, borderRadius: 6, border: "1px solid #E8E6E1", fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{d}</span>
                  <span style={{ fontSize: 11, color: "#B4B2A9" }}>回答待ち</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== 選考結果 TAB ===== */}
      {tab === "選考結果" && (
        <div style={{ flex: 1, padding: "20px 24px 24px", overflow: "auto" }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>選考結果を報告</div>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                {[{ l: "採用", c: "#1D9E75", bg: "#EEFBF3", icon: "🎉" }, { l: "不採用", c: "#A32D2D", bg: "#FCEBEB", icon: "✕" }].map(o => (
                  <div key={o.l} style={{ flex: 1, padding: 20, borderRadius: 10, border: o.l === "採用" ? "2px solid #1D9E75" : "1.5px solid #E8E6E1", background: o.l === "採用" ? o.bg : "#fff", textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{o.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: o.c }}>{o.l}</div>
                  </div>
                ))}
              </div>
              <Field label="入社予定日" placeholder="2026/05/01" required wide />
              <Field label="配属先" placeholder="東京本社" required wide />
              <Field label="年収・条件" placeholder="月給25万、社保完備" wide />
              <Field label="社内メモ（任意）" placeholder="面接時の印象、配属先への申し送り事項など" type="textarea" wide />
              <div style={{ background: "#EEFBF3", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "#1D9E75" }}>確定後、求職者にメールで通知されます。</div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}><Btn primary={false}>キャンセル</Btn><Btn>結果を確定する</Btn></div>
            </div>
          </div>
        </div>
      )}

      {/* ===== メッセージ TAB ===== */}
      {tab === "メッセージ" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, padding: "16px 24px", overflow: "auto" }}>
            {/* Company message */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <div style={{ maxWidth: 400 }}>
                <div style={{ background: "#E8593C", color: "#fff", borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>田中さん、はじめまして。株式会社サンプル建設の採用担当です。プロフィールを拝見し、ぜひ一度お話しさせていただきたくスカウトをお送りしました。未経験からスタートできる施工管理のお仕事です。</div>
                <div style={{ textAlign: "right", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>既読 4/5 14:30</div>
              </div>
            </div>
            {/* User reply */}
            <div style={{ display: "flex", marginBottom: 14 }}>
              <div style={{ maxWidth: 400 }}>
                <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>ご連絡ありがとうございます。ぜひ面接をお願いしたいです。4月14日の10:00からでお願いできますか？</div>
                <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>4/5 14:45</div>
              </div>
            </div>
            {/* Company reply */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <div style={{ maxWidth: 400 }}>
                <div style={{ background: "#E8593C", color: "#fff", borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>ありがとうございます！4月14日(月) 10:00〜11:00で確定とさせていただきます。場所は東京都新宿区西新宿1-1-1 サンプルビル3Fです。当日はお気をつけてお越しください。</div>
                <div style={{ textAlign: "right", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>既読 4/6 09:15</div>
              </div>
            </div>
            {/* User reply */}
            <div style={{ display: "flex", marginBottom: 14 }}>
              <div style={{ maxWidth: 400 }}>
                <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>承知しました。当日よろしくお願いいたします！</div>
                <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>4/6 09:30</div>
              </div>
            </div>
            {/* File message */}
            <div style={{ display: "flex", marginBottom: 14 }}>
              <div style={{ maxWidth: 400 }}>
                <div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px", padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "#F7F6F3", borderRadius: 8 }}>
                    <span style={{ fontSize: 16 }}>📄</span>
                    <div><div style={{ fontSize: 12, fontWeight: 600 }}>履歴書.pdf</div><div style={{ fontSize: 10, color: "#8C8A82" }}>2.1MB</div></div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>4/6 09:31</div>
              </div>
            </div>
          </div>
          {/* Input bar */}
          <div style={{ padding: "12px 24px", background: "#fff", borderTop: "1px solid #E8E6E1", display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>+</div>
            <div style={{ flex: 1, height: 40, borderRadius: 20, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13, color: "#B4B2A9" }}>メッセージを入力...</div>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "pointer" }}>↑</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenMessageList({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="メッセージ"><span style={{ fontSize: 12, color: "#8C8A82" }}>未読 1件</span></TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E6E1", overflow: "hidden" }}>
          {[{ n: "田中 太郎", p: "承知しました。当日よろしくお願いいたします！", t: "4/6", u: false, s: "選考中" }, { n: "佐藤 花子", p: "面接日程の件、承知しました。", t: "昨日", u: true, s: "面接待ち" }].map((m, i) => (
            <div key={i} onClick={() => onNavigate("応募者詳細")} style={{ display: "flex", gap: 14, padding: "16px 20px", borderBottom: i < 1 ? "1px solid #F1EFE8" : "none", cursor: "pointer", background: m.u ? "#FFFBF8" : "transparent" }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#5F5E5A" }}>{m.n[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 14, fontWeight: m.u ? 700 : 500 }}>{m.n}</span><span style={{ fontSize: 11, color: "#B4B2A9" }}>{m.t}</span></div>
                <Tag color={m.s === "選考中" ? "blue" : "orange"}>{m.s}</Tag>
                <div style={{ fontSize: 12, color: "#5F5E5A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 4 }}>{m.p}</div>
              </div>
              {m.u && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#E8593C", marginTop: 8 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenChat({ onNavigate }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FAFAF8" }}>
      <TopBar title="田中 太郎 とのメッセージ"><Tag color="blue">選考中</Tag><Btn small onClick={() => onNavigate("応募者詳細")}>応募者詳細</Btn></TopBar>
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}><div style={{ maxWidth: 360 }}><div style={{ background: "#E8593C", color: "#fff", borderRadius: "12px 12px 4px 12px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>田中さん、プロフィールを拝見し面接の機会をいただきたくご連絡しました。</div><div style={{ textAlign: "right", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>既読 14:30</div></div></div>
        <div style={{ display: "flex", marginBottom: 14 }}><div style={{ maxWidth: 360 }}><div style={{ background: "#fff", border: "1px solid #E8E6E1", borderRadius: "12px 12px 12px 4px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>ご連絡ありがとうございます。ぜひ面接をお願いしたいです。</div><div style={{ fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>14:45</div></div></div>
      </div>
      <div style={{ padding: "12px 24px", background: "#fff", borderTop: "1px solid #E8E6E1", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F7F6F3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>+</div>
        <div style={{ flex: 1, height: 40, borderRadius: 20, border: "1.5px solid #D3D1C7", display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13, color: "#B4B2A9" }}>メッセージを入力...</div>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, cursor: "pointer" }}>↑</div>
      </div>
    </div>
  );
}

function ScreenJobManage({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}>
      <TopBar title="求人管理"><Btn onClick={() => onNavigate("求人編集")}>+ 新規求人を追加</Btn></TopBar>
      <div style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E6E1", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 80px 60px 100px", background: "#F7F6F3", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#8C8A82" }}><div>職種</div><div>雇用形態</div><div>給与</div><div>状態</div><div>応募数</div><div>アクション</div></div>
          {[["施工管理", "正社員", "月給25〜35万", "green", "掲載中", "8"], ["現場作業員", "正社員", "月給22〜30万", "green", "掲載中", "4"], ["事務", "パート", "時給1,200円", "gray", "下書き", "0"]].map(([t, e, s, c, st, n], i) => (
            <div key={i} onClick={() => onNavigate("求人編集")} style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 80px 60px 100px", padding: "12px 16px", borderTop: "1px solid #F1EFE8", cursor: "pointer", fontSize: 13, alignItems: "center" }}>
              <div style={{ fontWeight: 600 }}>{t}</div><div>{e}</div><div>{s}</div><div><Tag color={c}>{st}</Tag></div><div>{n}</div><div><Btn small>編集</Btn></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenJobEdit({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}><TopBar title="求人編集 - 施工管理"><Btn small primary={false} onClick={() => onNavigate("求人管理")}>← 戻る</Btn></TopBar>
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #E8E6E1" }}>
          <Field label="職種" placeholder="施工管理スタッフ" required wide /><Field label="雇用形態" placeholder="正社員 ▼" required wide />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><Field label="月給（下限）" placeholder="250,000" required /><Field label="月給（上限）" placeholder="350,000" required /></div>
          <Field label="仕事内容" placeholder="建設現場の工程・品質・安全管理..." type="textarea" required wide />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}><Btn small outline danger>掲載を停止</Btn><div style={{ display: "flex", gap: 10 }}><Btn primary={false}>下書き保存</Btn><Btn>変更を反映</Btn></div></div>
        </div>
      </div>
    </div>
  );
}

function ScreenSettings({ onNavigate }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "#FAFAF8" }}><TopBar title="設定" />
      <div style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px" }}>
        {/* アカウント管理（複数人） */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>アカウント管理</div>
            <Btn small>+ メンバーを追加</Btn>
          </div>
          <div style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 12 }}>複数の担当者を登録してチームで運用できます</div>
          {[
            { name: "管理 太郎", email: "admin@sample.co.jp", role: "管理者", color: "#E8593C" },
            { name: "佐藤 次郎", email: "j.sato@sample.co.jp", role: "担当者", color: "#2E6FD4" },
            { name: "鈴木 花子", email: "h.suzuki@sample.co.jp", role: "閲覧のみ", color: "#8C8A82" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? "1px solid #F1EFE8" : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>{m.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "#8C8A82" }}>{m.email}</div>
              </div>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: m.role === "管理者" ? "#FFF3ED" : m.role === "担当者" ? "#EDF4FF" : "#F1EFE8", color: m.role === "管理者" ? "#E8593C" : m.role === "担当者" ? "#2E6FD4" : "#8C8A82", fontWeight: 600 }}>{m.role}</span>
              <span style={{ fontSize: 14, color: "#D3D1C7", cursor: "pointer" }}>›</span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 11, color: "#8C8A82" }}>権限: 管理者（全操作可）/ 担当者（スカウト・メッセージ可）/ 閲覧のみ</div>
        </div>
        {[{ t: "スカウトテンプレート", i: ["施工管理 - 未経験歓迎テンプレ", "+ 新しいテンプレートを追加"] }, { t: "通知設定", i: ["新着応募通知: ON", "スカウト応答通知: ON", "メッセージ通知: ON"] }].map(s => (
          <div key={s.t} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{s.t}</div>
            {s.i.map((item, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < s.i.length - 1 ? "1px solid #F1EFE8" : "none", fontSize: 13, color: item.startsWith("+") ? "#E8593C" : "#1A1A1A", fontWeight: item.startsWith("+") ? 600 : 400, cursor: "pointer" }}><span>{item}</span><span style={{ color: "#D3D1C7" }}>›</span></div>)}
          </div>
        ))}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #E8E6E1", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>その他</div>
          {["利用規約", "プライバシーポリシー", "ログアウト"].map((item, i) => (
            <div key={item} style={{ padding: "10px 0", borderBottom: i < 2 ? "1px solid #F1EFE8" : "none", fontSize: 13, cursor: "pointer", display: "flex", justifyContent: "space-between", color: item === "ログアウト" ? "#E24B4A" : "#1A1A1A" }}><span>{item}</span><span style={{ color: "#D3D1C7" }}>›</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== SCREEN MAP & MAIN =====
const SCREEN_MAP = {
  "ログイン": ScreenLogin, "企業情報登録": ScreenCompanyReg, "求人情報登録": ScreenJobReg,
  "ダッシュボード": ScreenDashboard,
  "応募者検索(リスト)": ScreenSearchList, "応募者検索(カード)": ScreenSearchCard,
  "応募者管理(リスト)": ScreenManageList, "応募者管理(カード)": ScreenManageCard,
  "応募者詳細": ScreenApplicantDetail,
  "メッセージ一覧": ScreenMessageList, "チャット画面": ScreenChat, "求人管理": ScreenJobManage, "求人編集": ScreenJobEdit, "設定": ScreenSettings,
};

export default function EmployerMock({ onBack }) {
  const [current, setCurrent] = useState("ダッシュボード");
  const [phase, setPhase] = useState("ダッシュボード");
  const navigate = (s) => { setCurrent(s); for (const [p, screens] of Object.entries(PHASES)) { if (screens.includes(s)) { setPhase(p); break; } } };
  const ScreenComponent = SCREEN_MAP[current];
  const showSidebar = !["ログイン", "企業情報登録", "求人情報登録"].includes(current);
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Noto Sans JP','Hiragino Sans',sans-serif", background: "#FAFAF8" }}>
      {onBack && <div style={{ textAlign: "center", padding: "4px 0", background: "#fff", borderBottom: "1px solid #E8E6E1" }}><button onClick={onBack} style={{ padding: "2px 14px", borderRadius: 16, border: "1px solid #D3D1C7", background: "#fff", color: "#5F5E5A", fontSize: 11, cursor: "pointer" }}>← トップに戻る</button></div>}
      <div style={{ display: "flex", gap: 6, padding: "8px 16px", background: "#fff", borderBottom: "1px solid #E8E6E1", overflowX: "auto", flexShrink: 0 }}>
        {Object.entries(PHASES).map(([p, screens]) => <button key={p} onClick={() => { setPhase(p); setCurrent(screens[0]); }} style={{ padding: "4px 14px", borderRadius: 16, border: "none", background: phase === p ? "#E8593C" : "transparent", color: phase === p ? "#fff" : "#8C8A82", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{p}</button>)}
        <div style={{ borderLeft: "1px solid #E8E6E1", margin: "0 4px" }} />
        {PHASES[phase].map(s => <button key={s} onClick={() => setCurrent(s)} style={{ padding: "4px 10px", borderRadius: 6, border: "none", background: current === s ? "#1A1A1A" : "transparent", color: current === s ? "#fff" : "#B4B2A9", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>)}
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {showSidebar && <Sidebar active={current} onNavigate={navigate} />}
        <ScreenComponent onNavigate={navigate} />
      </div>
    </div>
  );
}
