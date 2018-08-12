package com.weekly_countdown_rn.fullScreen;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class FullScreenPackage implements ReactPackage {
    public FullScreenPackage(){

    }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
    return  Arrays.<NativeModule>asList(new FullScreen(reactApplicationContext));
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
      return Collections.emptyList();
  }
}