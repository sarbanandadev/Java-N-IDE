private void statusbarcolor() {
  if (Build.VERSION.SDK_INT >= BUILD.VERSION_CODES.M) {
    getWindow().setStatusBarColor(getResources().getColor(R.color.js_yellow, this.getTheme()));
  } else if (Build.VERSION.SDK_INT >= BUILD.VERSION_CODES.LOLIPOP) {
    getWindow().setStatusBarColor(getResources().getColor(R.color.js_yellow));
  }
}


getWindow().getStatusBarColor(ContextCompat.getColor(MainActivity.this, R.color.colorAccent))