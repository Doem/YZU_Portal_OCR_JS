javascript:(function OCR() {
    $.getScript('https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js', function() {
        $.getScript('https://www.marvinj.org/releases/marvinj-1.0.min.js', function() {
            image = new MarvinImage();
            image.load('https://portalx.yzu.edu.tw/PortalSocialVB/SelRandomImage.aspx',function(){
                imageOut = new MarvinImage(image.getWidth(), image.getHeight());
                Marvin.thresholding(image, imageOut, 115);
                Marvin.gaussianBlur(imageOut, imageOut, 3.0);
                Marvin.thresholding(imageOut, imageOut, 150);
                
                var tesseract = Tesseract;
                (async () => {
                  const worker = tesseract.createWorker();
                  await worker.load();
                  await worker.loadLanguage('eng');
                  await worker.initialize('eng');
                  const { data: { text } } = await worker.recognize(imageOut.toBlob());
                  document.getElementById('Txt_VeriCode').value = text;
                  console.log(text);
                })();
            });
        });    
    });
})();
