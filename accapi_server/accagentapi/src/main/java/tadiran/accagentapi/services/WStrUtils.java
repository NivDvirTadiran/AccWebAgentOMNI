package tadiran.accagentapi.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
//import javax.faces.model.SelectItem;

/**
 * <p>
 * Title: Utilities for strings handling
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2004
 * </p>
 * <p>
 * Company: Tadiran Telecom
 * </p>
 *
 * @author naama
 * @version 1.0
 */
public class WStrUtils
{
    public static final String EMPTY_STR = "";
    public static final String SKIP      = "!!!@@@";
    public static final String CANONICAL_PLUS      = "+";
    public static final String AND      = "and";
    public static final String SPACE      = " ";
    public static final String HTML_SPACE      = "&nbsp;";
	public static final String PATH_SEPARATOR = "/";
    public static final String NUMMERIC_PATTERN = "([0-9])+";    
    
    

    /**
     * checks if the given str is null
     * 
     * @param str the given string
     * @return true if str is null false otherwize
     */
    public static boolean isNullStr(final String str)
    {
        return (str == null);
    }

    public static boolean isEmptyTrimmedStr(final String str)
    {
        return (isEmptyStr(getTrimmedString(str)));
    }

    public static int compare(final String str1, final String str2, final boolean ignrorCase)
    {
    	if(str1 == null)
            if(str2 == null)
               return 0; //equal
            else
               return -1; // null is before other strings
        else if(str2 == null) // str1 != null            
               return 1;  // all other strings are after null
        else
        	if( ignrorCase )
                return str1.compareToIgnoreCase(str2);
            else
                return str1.compareTo(str2);
                
            
    }

    public static boolean equals(final String str1, final String str2)
    {
    	return compare(str1, str2, false) == 0;
            
    }
    /**
     * checks if the given str is null
     *
     * @param str the given string
     * @return true if str is null or empty str, false otherwize
     */
    public static boolean isEmptyStr(final String str)
    {
        return (isNullStr(str) || (str.length() == 0));

    }
    
    public static String getString(final Object obj)
    {
        return (obj == null) ? EMPTY_STR : obj.toString();
    }

    public static int getLen(final String str)
    {
        return getString(str).length();
    }

    public static String getString(final String str)
    {
        return (str == null) ? EMPTY_STR : str;
    }

    public static String getIntegerStr(final Integer inInteger)
    {
        return (inInteger == null) ? (new Integer(0)).toString() : inInteger.toString();
    }
    
    public static String getBooleanStr(final Boolean inBoolean, final Boolean defaultValue)
    {
        return inBoolean == null ? defaultValue.toString() : inBoolean.toString();
    }
    
    public static String getBooleanStr(final Boolean inBoolean)
    {
        return getBooleanStr(inBoolean, Boolean.FALSE);
    }

    public static String getLongStr(final Long inLong)
    {
        return (inLong == null) ? (new Long(0)).toString() : inLong.toString();
    }

    public static String getTrimmedString(final String str)
    {
        return getTrimmedString(str, false);
    }

    public static String getTrimmedString(final String str, final boolean preserveNull)
    {
        return (str == null) ? (preserveNull ? null : "") : str.trim();
    }

    public static String toString(final Collection<? extends Object> collection, String delimiter)
    {
        return toString(collection.toArray(), delimiter);
    }

    public static String toString(final Object[] objects, String delimiter)
    {
        StringBuffer retVal = new StringBuffer();
        for (int i = 0; i < objects.length; i++)
        {
            retVal.append(objects[i]);
            if( i < (objects.length - 1) )
            {
                retVal.append(delimiter);
            }
        }
        return retVal.toString();
    }
    
    public static void addToLast(final ArrayList<String> array, final String extraStr)
    {
        int index = array.size() -1;
        String newString= array.get(index) + extraStr;
        array.set(index, newString);
    }
    
    public static String setToMaxLen(String str, int max_len)
    {
        String newString = str;
        int len = max_len - getLen("...");
        if (getLen(newString) > max_len)
            newString = newString.substring(0,len) + "...";        
        
        return newString;
    }
    
    public static String setToLen(String str, String divider)
    {
        String newString = str;        
        int idx = str.indexOf(divider);
        if (idx > -1)
            newString = newString.substring(0,idx) + "...";

        return newString;
    }    
        
    public static boolean isCanonical(String externalNumber)
    {
        if (!isEmptyStr(externalNumber) && externalNumber.startsWith(CANONICAL_PLUS))
        {
            return true;
        }
        return false;
    }
    
    public static String makeCanonical(String externalNumber, boolean isCanonical)
    {
        if (isCanonical)
            return CANONICAL_PLUS + externalNumber;
        return externalNumber;
    }
    
    public static String capitalizeFirstLetter(String str)
    {
        if (str == null)
            return EMPTY_STR;
        
        StringBuffer strBuffer = new StringBuffer();
        int idx = 0;
        
        // todo: generalize to any non letter character.
        if (str.startsWith("("))
        {
            idx++;
        }
            
        strBuffer.append(str.replaceFirst(
                str.substring(idx,idx+1),
                str.substring(idx,idx+1).toUpperCase())
                );
        
        return strBuffer.toString();        
    }

	public static int getInteger(String value) {
		if (isEmptyStr(value)) return 0;
		
		try {
			value = value.replace("+", "");
			return Integer.parseInt(value);
		}
		catch (Exception e) {
			try {
				Double.parseDouble(value);
				return Integer.MAX_VALUE;
			}
			catch (Exception e1) {}			
		}
		return 0;
	}
	
	public static long getLong(String value) {
		if (isEmptyStr(value)) return 0;
		
		try {
			return Long.parseLong(value);
		}
		catch (Exception e) {
			try {
				Double.parseDouble(value);
				return Long.MAX_VALUE;
			}
			catch (Exception e1) {}			
		}
		return 0;
	}
	
	public static <T> String listToString(List<T> list, String delimiter) {
		if (list == null || delimiter == null) return EMPTY_STR;
		
		StringBuilder sb = new StringBuilder();
		for (T s : list) {
		    sb.append(s);
		    sb.append(delimiter);
		}
		
		if (sb.length() != 0) {
			return sb.toString().substring(0, sb.length() - delimiter.length());
		}
		return EMPTY_STR;
	}
	
	public static String verifyEndsWith(String path, String what)
	{
		if (!isEmptyStr(path) &&
				!path.endsWith(what) ) {
			return path + what;
		}	
		return path;
	}
	public static Integer getMaxLengthElement (Collection<String> col)
	{
		if (col == null) return null;
		
		Iterator<String> iter = col.iterator();
		int longest = 0;
		String value;
		while (iter.hasNext())
		{
			value = iter.next();
			if ( longest < value.length() )
				longest = value.length();
		}
		return longest;
	}
	
	public static <T> boolean contains( final T[] array, final T v ) {
	    for ( final T e : array )
	        if ( e == v || v != null && v.equals( e ) )
	            return true;

	    return false;
	}
	
	public static boolean getBoolean(String value) {
		try {
			return Boolean.valueOf(value).booleanValue();
		}
		catch (Exception e) { 
			
		}
		
		return Boolean.FALSE.booleanValue();
	}

	public static String getLastSplit(String name, String delimiter)
	{
		int pos = getString(name).lastIndexOf(delimiter);
		if (pos > 0)
			return name.substring(pos + 1);
		
		return name;
	}
	
	public static String getFirstSplit(String name, String delimiter, int fromIndex, boolean includeDelimiter)
	{
		int pos = getString(name).indexOf(delimiter, fromIndex);
		if (pos != -1)
			return name.substring(0, includeDelimiter ? pos + 1 : pos);
		
		return name;
	}
	
	public static String[] getSplit2Two(String toSplit, String delimiter)
	{
		if (toSplit == null) return new String[2];
		
		String[] result = new String[2];
		int pos = toSplit.indexOf(delimiter);
		if (pos != -1)
		{
			result[0] = toSplit.substring(0, pos);
			result[1] = toSplit.substring(pos + 1);
		}
		else
		{
			result[0] = toSplit;
		}
		return result;
	}
	
	 public static Map<String, String> parseQueryStringIntoMap(String query)  
	 {  
	     if (query == null) return new HashMap<String, String>();
	     String[] params = query.split("&");  
	     Map<String, String> map = new HashMap<String, String>();  
	     for (String param : params)  
	     {  
	         String name = param.split("=")[0];  
	         String value = param.split("=")[1];  
	         map.put(name, value);  
	     }  
	     return map;  
	 }  
	 
	 public static boolean isNumeric(final String value)
	 {
        if( isEmptyStr(value) )
        {
            return false;
        }
        return value.matches(NUMMERIC_PATTERN);
	 }

	public static String appendDigits(final String sStart,
                final int iLength, final char cDigit)
	{
		final StringBuilder sb = new StringBuilder(sStart);
		
		for (int i = sb.length(); i < iLength; ++i)
		{
			sb.append(cDigit);
		}
		return sb.toString();
	}

	public static String prependDigits(final String sEnd,
            final int iLength, final char cDigit)
	{
		int sEndLength = sEnd.length();
		if (sEndLength >= iLength) return sEnd;
		final StringBuilder sb = new StringBuilder();
		
		for (int i = sEndLength; i < iLength; ++i)
		{
			sb.append(cDigit);
		}
		sb.append(sEnd);
		return sb.toString();
	}

	public static String trim(String str, String trimStr)
	{
		if (str == null) return null;
	      
		return str.trim().replaceAll("^" + trimStr + "+", "").replaceAll(trimStr + "+$", "");
	}
	
	 public static String date2Filename (Date d){
		 if (d == null) d = new Date();
		 SimpleDateFormat sdf = new SimpleDateFormat("EEE_MMM_dd_HH-mm-ss_zzz_yyyy", Locale.US);
		 return sdf.format(d);
		 
	 }
    /*public static List<SelectItem> getStrList(int num, String[] strs)
    {
        List<SelectItem> result = new ArrayList<SelectItem>();
        for (int i = 0; i < num; i++)
        {
            if( SKIP.equals(strs[i]) )
                continue;
            result.add(new SelectItem(new Integer(i), strs[i]));
        }
        return result;
    } */
}
