package sndev.demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import sndev.demo.R;

public class MainActivity extends Activity {
  
  private View decorView;
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    decorView = getWindow().getDecorView();
    
    decorView.setOnSystemUiVisibilityChangeListener(
      new View.OnSystemUiVisibilityChangeListener() {
        @Override
        public void onSystemUiVisibilityChange(int visibility) {
          if (visibility == 0) {
            decorView.setSystemUiVisibility(hideSystemBars());
          }
        }
      }
    );
    
  }
    
  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) {
      decorView.setSystemUiVisibility(hideSystemBars());
    }
  }
  
  private int hideSystemBars() {
    return View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
      View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
      View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
      View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
      View.SYSTEM_UI_FLAG_FULLSCREEN |
      View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
  }

}