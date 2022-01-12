package com.example.myapplication;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.view.Window;
import android.view.WindowManager;

public class SplashActivity extends Activity {

@Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_splash);
      
      Window window = getWindow();
      window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
      
      Thread splashTread = new Thread(){
        @Override
        public void run() {
          try {
            sleep(3000);
            startActivity(new Intent(getApplicationContext(),MainActivity.class));
            finish();
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
          super.run();
        }
      };
      splashTread.start();
   }

}
