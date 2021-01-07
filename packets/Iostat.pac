<?xml version="1.0" encoding="utf-8"?>
<ReportPacket ID="0" Name="Iostat" AuthorName="CRYPTTECH" CreateDate="2020-09-24T11:18:13.3400099+03:00" Version="1.0" Description="" IsSystem="false">
  <LSource ID="121251" Name="Iostat" WatchInterval="10" Path="/var/log/iostat" FileName="iostat-20200421.log" FileNameFormat="iostat-{yyyy}{MM}{dd}.log" SourceType="file" ConStr="JOtJzoO4+dDpmIukLJ+tZw==" ConStrEnc="true" DeleteOldFile="true">
    <CustomArchive />
    <IndexConfigs DoIndex="true" IndexColumns="device,r_s,w_s,rkB_s,wkB_s,rrqm_s,wrqm_s,wrqm,r_await,w_await,aqu_sz,rareq_sz,wareq_sz,svctm,util,user,nice,system,iowait,steal,idle," />
    <CollectorConfig />
    <SSHConfig />
    <ExtConfig>
      <Date1FormatChange />
    </ExtConfig>
    <AggregationConfig />
  </LSource>
  <PList ID="121252" LogSourceID="121251" Name="Iostat" CreateDate="2020-09-24T10:02:46.5166039+03:00" Description="11.6.1 versiyonunu desteklemektedir." CatCode="SYSTEM-STATS">
    <Expressions>
      <Expression No="1" Name="C1" ExpressionType="Code">
        <CodeStr><![CDATA[public bool Parse(string line, ref List<string> values, ref List<string> buffer, ref string logStr)
{
  
    string[] fw1=new string[22];
    int[] bytes_column = new int[] {6,7,8,9,14,15,16,17,18,19};
    string dt="";
    string sub_line="";
    List<string> vals = new List<string>();
    if(line.IndexOf(",")>-1)
      {
          string[] stringSeparators = new string[] {","};
        string[] result;
        result = line.Split(stringSeparators, StringSplitOptions.None);
        for (int j = 0; j < result.Length; j++)
        {
            string val_str=result[j];
            vals.Add(val_str.Trim());

        }
      }
    /*                      
    for (int k = 0; k < vals.Count; k++)
    {
           
        if(bytes_column.Contains(k)){
        
            double column_value = Convert.ToDouble(vals[k]);
            fw1[k] = SizeSuffix(column_value);
        }
        else
            fw1[k] = vals[k];
    }
    */

    System.Text.RegularExpressions.Regex acRegEx1 = new System.Text.RegularExpressions.Regex(@"(?<date1>\d+\/\d+\/\d+\s+\d+:\d+:\d+\s+\S+)");    
    System.Text.RegularExpressions.Match acMatch1 = acRegEx1.Match(vals[0]); //hengi parcaya regex uygulanacaksa o geleceki

    if (acMatch1.Success)
      {
        if(vals.Count == 7){
        
            for (int k = 0; k < vals.Count; k++)
            {           
        
                fw1[k] = vals[k];
            }
        }
        else if(vals.Count == 15){
        
                for (int k = 0; k < vals.Count; k++)
                {         
                
                    if(k == 0)    
                        fw1[k] = vals[k];
                    else
                        fw1[k + 6] = vals[k];
                }
            }
        fw1[21] = "stats";    
        for(int i=0;i<fw1.Length;i++)
        {
            if(fw1[i]==null) fw1[i]="";
            values.Add(fw1[i]);
        }
        
        return true;
    }
  else
    return false;    
      
}


static readonly string[] SizeSuffixes = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };

static string SizeSuffix(double value, int decimalPlaces = 1)
{
    if (value < 0) { return "-" + SizeSuffix(-value); } 

    int i = 0;
    decimal dValue = (decimal)value;
    while (Math.Round(dValue, decimalPlaces) >= 1000)
    {
        dValue /= 1024;
        i++;
    }

    return string.Format("{0:n" + decimalPlaces + "} {1}", dValue, SizeSuffixes[i]);
}]]></CodeStr>
        <IDColumnType>number</IDColumnType>
        <ExpressionFields>
          <ExpressionField No="0" Name="date1" NameUF="date1" DateFormat="MM/dd/yyyy hh:mm:ss tt" />
          <ExpressionField No="1" Name="user" NameUF="user" />
          <ExpressionField No="2" Name="nice" NameUF="nice" />
          <ExpressionField No="3" Name="system" NameUF="system" />
          <ExpressionField No="4" Name="iowait" NameUF="iowait" />
          <ExpressionField No="5" Name="steal" NameUF="steal" />
          <ExpressionField No="6" Name="idle" NameUF="idle" />
          <ExpressionField No="7" Name="device" NameUF="device" />
          <ExpressionField No="8" Name="rrqm_s" NameUF="rrqm_s" />
          <ExpressionField No="9" Name="wrqm_s" NameUF="wrqm_s" />
          <ExpressionField No="10" Name="r_s" NameUF="r_s" />
          <ExpressionField No="11" Name="w_s" NameUF="w_s" />
          <ExpressionField No="12" Name="rkB_s" NameUF="rkB_s" />
          <ExpressionField No="13" Name="wkB_s" NameUF="wkB_s" />
          <ExpressionField No="14" Name="avgrq_sz" NameUF="avgrq_sz" />
          <ExpressionField No="15" Name="avgqu_sz" NameUF="avgqu_sz" />
          <ExpressionField No="16" Name="await" NameUF="await" />
          <ExpressionField No="17" Name="r_await" NameUF="r_await" />
          <ExpressionField No="18" Name="w_await" NameUF="w_await" />
          <ExpressionField No="19" Name="svctm" NameUF="svctm" />
          <ExpressionField No="20" Name="util" NameUF="util" />
          <ExpressionField No="21" Name="type" NameUF="type" />
        </ExpressionFields>
        <CodeType>c#</CodeType>
      </Expression>
    </Expressions>
  </PList>
  <Localizations Language="en">
    <Items Key="Name" ValueOrj="Iostat" Value="Iostat" />
    <Items Key="LSource0.Name" ValueOrj="Iostat" Value="Iostat" />
    <Items Key="PList0.Name" ValueOrj="Iostat" Value="Iostat" />
    <Items Key="PList0.Expressions0.Name" ValueOrj="C1" Value="C1" />
    <Items Key="PList0.Expressions0.ExpressionFields0.NameUF" ValueOrj="date1" Value="date1" />
    <Items Key="PList0.Expressions0.ExpressionFields1.NameUF" ValueOrj="user" Value="user" />
    <Items Key="PList0.Expressions0.ExpressionFields2.NameUF" ValueOrj="nice" Value="nice" />
    <Items Key="PList0.Expressions0.ExpressionFields3.NameUF" ValueOrj="system" Value="system" />
    <Items Key="PList0.Expressions0.ExpressionFields4.NameUF" ValueOrj="iowait" Value="iowait" />
    <Items Key="PList0.Expressions0.ExpressionFields5.NameUF" ValueOrj="steal" Value="steal" />
    <Items Key="PList0.Expressions0.ExpressionFields6.NameUF" ValueOrj="idle" Value="idle" />
    <Items Key="PList0.Expressions0.ExpressionFields7.NameUF" ValueOrj="device" Value="device" />
    <Items Key="PList0.Expressions0.ExpressionFields8.NameUF" ValueOrj="rrqm_s" Value="rrqm_s" />
    <Items Key="PList0.Expressions0.ExpressionFields9.NameUF" ValueOrj="wrqm_s" Value="wrqm_s" />
    <Items Key="PList0.Expressions0.ExpressionFields10.NameUF" ValueOrj="r_s" Value="r_s" />
    <Items Key="PList0.Expressions0.ExpressionFields11.NameUF" ValueOrj="w_s" Value="w_s" />
    <Items Key="PList0.Expressions0.ExpressionFields12.NameUF" ValueOrj="rkB_s" Value="rkB_s" />
    <Items Key="PList0.Expressions0.ExpressionFields13.NameUF" ValueOrj="wkB_s" Value="wkB_s" />
    <Items Key="PList0.Expressions0.ExpressionFields14.NameUF" ValueOrj="avgrq_sz" Value="avgrq_sz" />
    <Items Key="PList0.Expressions0.ExpressionFields15.NameUF" ValueOrj="avgqu_sz" Value="avgqu_sz" />
    <Items Key="PList0.Expressions0.ExpressionFields16.NameUF" ValueOrj="await" Value="await" />
    <Items Key="PList0.Expressions0.ExpressionFields17.NameUF" ValueOrj="r_await" Value="r_await" />
    <Items Key="PList0.Expressions0.ExpressionFields18.NameUF" ValueOrj="w_await" Value="w_await" />
    <Items Key="PList0.Expressions0.ExpressionFields19.NameUF" ValueOrj="svctm" Value="svctm" />
    <Items Key="PList0.Expressions0.ExpressionFields20.NameUF" ValueOrj="util" Value="util" />
    <Items Key="PList0.Expressions0.ExpressionFields21.NameUF" ValueOrj="type" Value="type" />
  </Localizations>
</ReportPacket>