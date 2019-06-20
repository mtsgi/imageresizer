function resize() {
    let file = document.getElementById( 'imageFile' ).files[0];

    let img = document.createElement( "img" );
    let reader = new FileReader();
    reader.onload = function( e ) {
        img.src = e.target.result;
        
        mylog("【リサイズ処理開始】対象:" + file.name );

        var canvas = document.createElement( "canvas" );
        var ctx = canvas.getContext( "2d" );
        ctx.drawImage( img, 0, 0 );

        let maxWidth = Number( $( "#max-width" ).val() ) || Infinity;
        let maxHeight = Number( $( "#max-height" ).val() ) || Infinity;
        var w = img.width, h = img.height;
        if( w == 0 && h == 0 ){
            mylog("[!]画像の読み込みに失敗/再試行します");
            resize();
            return;
        }

        mylog( "元画像のサイズ:" + img.width + "x" + img.height );

        mylog( "幅倍率:" + maxWidth / w );
        mylog( "高さ倍率:" + maxHeight / h );

        if( maxWidth / w < maxHeight / h ){
            if( w > maxWidth ) {
                mylog( "上限幅の超過を検出:" + maxWidth );
                h *= maxWidth / w;
                w = maxWidth;
            }
        }
        else if( h > maxHeight ) {
            mylog( "上限高さの超過を検出:" + maxHeight );
            w *= maxHeight / h;
            h = maxHeight;
        }
        
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext( "2d" );
        ctx.drawImage( img, 0, 0, w, h );
        mylog( "変換後のサイズ:" + w + "x" + h );

        document.getElementById( 'output' ).src = canvas.toDataURL( "image/png" );
    }
    try {
        reader.readAsDataURL( file );
    } catch (error) {
        mylog( "エラーです:" + error );
    }

}

function mylog( str ) {
    $( "#logs" ).append( "<div>" + str + "</div>" );
}