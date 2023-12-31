# alphacamp-url-shortener
短網址產生器

## 專案使用

### 安裝依賴套件

```
npm install
```

### 啟動伺服器

```
npm run dev
```

### 縮短網址

在 `1` 輸入要縮短的網址，按下 `2` 的按鈕，就可以獲得縮短的網址

![縮短網址頁面](./repo/images/shorten.png)

### 複製短網址

按下 `Copy` 按鈕後會複製短網址到剪貼簿，並返回上一頁，以繼續縮短網址

![複製短網址頁面](./repo/images/become_shorted.png)

## 短網址一致性

同樣的網址，進行縮短服務後，會獲得相同的結果。下列有幾組網址，可用於驗證是否一致，其中短網址省略前方的 `http://localhost:3000`

<table width="100%" border="2">
    <thead>
        <tr>
            <th>原始網址</th>
            <th>縮短網址</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html</td>
            <td>PjCFW</td>
        </tr>
        <tr>
            <td>https://zh.wikipedia.org/zh-tw/Wiki</td>
            <td>8oRCn</td>
        </tr>
        <tr>
            <td>https://www.google.com/</td>
            <td>b19GS</td>
        </tr>
        <tr>
            <td>https://tw.alphacamp.co/</td>
            <td>1fqG6</td>
        </tr>
    </tbody>
</table>