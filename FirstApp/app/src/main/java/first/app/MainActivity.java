package first.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import first.app.R;

public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    WebView webView = (WebView)findViewById(R.id.webView);
    webView.getSettings().setJavaScriptEnabled(true);
    webView.loadUrl("file:///android_asset/app/index.html");
  }

}
