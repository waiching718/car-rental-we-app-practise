package com.mercury.finalserver.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MyDateFormatter {

    public String myFormatter (String date){
        SimpleDateFormat stringToDateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date tempDate = null;
        try {
            tempDate = stringToDateFormatter.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat dateFormat = new SimpleDateFormat("dd-MMM-yy");
        String retDate = dateFormat.format(tempDate);
        return retDate;
    }

}
