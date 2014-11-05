package com.dcastalia.prescriptionapp.utils;

import java.security.MessageDigest;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
/**
 * BMSHAHashing class.
 *
 * @author Hasan Mansur
 * @version 1.00, 31-12-2013
 */
public class BMSHAHashing extends CordovaPlugin {
	
	/**
	 * Returns SHA-512 Hashing for password.
	 * 
	 * @param pass - given password
	 * @return String - Hashed password
	 */
	@Override
	 public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) {
	  if (action.equals("get")) {
	   cordova.getThreadPool().execute(new Runnable() {
	    public void run() {
	     try {
	      JSONObject params = args.getJSONObject(0);
	      String pass = params.getString("psw");     
	      try {
				String hashpass =  hashPassword(pass);
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK,hashpass));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				Log.e("PhoneGapLog", "BMSHAHashing Plugin: Error: " + PluginResult.Status.NO_RESULT);
			}
	      
	     } catch (JSONException e) {
	      e.printStackTrace();
	      Log.e("PhoneGapLog", "BMSHAHashing Plugin: Error: " + PluginResult.Status.JSON_EXCEPTION);
	      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
	     }/* catch (InterruptedException e) {
	      e.printStackTrace();
	      Log.e("PhoneGapLog", "Downloader Plugin: Error: " + PluginResult.Status.ERROR);
	      callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
	     }*/
	    }
	   });
	   return true;
	  } else {
	   Log.e("PhoneGapLog", "BMSHAHashing Plugin: Error: " + PluginResult.Status.INVALID_ACTION);
	   callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
	   return false;
	  }
	 }
	public String hashPassword(String pass) throws Exception
	{
		String password = pass;
		 
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(password.getBytes());
 
        byte byteData[] = md.digest();
 
        /*
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
         sb.append(byteData[i]);
        }
        */
        
        //convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
          sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        
        return sb.toString();
	}

}
