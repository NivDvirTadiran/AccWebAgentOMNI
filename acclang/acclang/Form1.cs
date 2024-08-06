using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace acclang
{


    public partial class Form1 : Form
    {
        Dictionary<Int32, all_langs> allLang_map = new Dictionary<Int32, all_langs>();
        Dictionary<string, all_langs> allLang_map_unique = new Dictionary<string, all_langs>();

        string allTextHebrew;
        string allTextRussian;
        string allTextChinese;
        string allTextJapanese;
        string allTextItalian;
        string allTextSpanish;
        string path;

        public Form1(string fnm)
        {
            InitializeComponent();
            int counter = 0;
            string line;

            path = Path.GetDirectoryName(fnm);

            allTextHebrew = File.ReadAllText(path + "Agent_hebrew.ini", Encoding.UTF8);
            allTextRussian = File.ReadAllText(path + "russian.ini", Encoding.UTF8);
            allTextChinese = File.ReadAllText(path + "chinese.ini", Encoding.UTF8);
            allTextJapanese = File.ReadAllText(path + "japanese.ini", Encoding.UTF8);
            allTextItalian = File.ReadAllText(path + "Italian.ini", Encoding.UTF8);
            //allTextSpanish = File.ReadAllText(path + "Spanish.ini", Encoding.UTF8);
            getOneLang(allTextHebrew, true, 0);
            getOneLang(allTextRussian, false, 1);
            getOneLang(allTextChinese, false, 2);
            getOneLang(allTextJapanese, false, 3);
            getOneLang(allTextItalian, false, 4);
            //getOneLang(allTextSpanish, false, 5);
            //
            System.IO.StreamReader file = new System.IO.StreamReader(fnm);
            string[] s;


            //bool dd = line.Contains("26103");
            //if (dd == true)
            //{
            //    int yyy;
            //    yyy = 0;
            //}


            try
            {

                Int32 idx = 0;
                string english = "";
                string moreEng = "";
                //
                while ((line = file.ReadLine()) != null)
                {
                    line = line.Replace("\\", "/");
                    s = line.Split(',');
                    counter++;
                    if (s.Length < 6)
                    {
                        while (s[s.Length - 1].Trim(' ') != "600" && s[s.Length - 1].Trim(' ') != "435")
                        {
                            string l = file.ReadLine();
                            if (l == null) break;
                            s = l.Split(',');
                            line += "" + l;
                            counter++;
                        }
                        s = line.Split(',');
                        //System.Console.WriteLine("+=+=+= " + s.Length + ",   " + line);
                    }
                    string x = "";
                    if (s.Length == 7)
                    {
                        if (s[1].Length > 3)
                        {
                            x = s[2].TrimEnd(' ').TrimStart(' ');
                            try
                            {

                                string[] ss = s[1].Split('\n');
                                if (ss.Length == 1)
                                {
                                    s[0] = ss[0];
                                }
                                else
                                {
                                    s[0] = s[1];
                                }

                            }
                            catch (Exception e)
                            {
                                System.Console.WriteLine("--- " + e.Message + "\n     " + e.StackTrace);
                                continue;
                            }
                            s[3] = "";
                            s[4] = s[5];
                            s[5] = "";


                        }
                        else
                        {
                            x = s[1].TrimEnd(' ').TrimStart(' ');
                        }
                        if (x != "3")
                        {
                            try
                            {
                                idx = Convert.ToInt32(s[1]);
                                english = s[6].Trim('\'').TrimStart('\'');
                                moreEng = s[5];
                            }
                            catch (Exception e)
                            {
                                System.Console.WriteLine(e.Message + " " + e.StackTrace);
                            }
                        }
                        else
                        {
                            try
                            {
                                idx = Convert.ToInt32(s[0]);
                                if (s[3] != "")
                                {
                                    english = s[3] + ", " + s[4] + ", " + s[5] + ", " + s[6];
                                    english = english.Replace("'", ""); 
                                }
                                else
                                {
                                    english = s[4];
                                }
                            }
                            catch (Exception e)
                            {
                                System.Console.WriteLine(e.Message + " " + e.StackTrace);
                            }
                        }
                    }
                    else if (s.Length <= 6)
                    {

                        try
                        {
                            idx = Convert.ToInt32(s[0]);
                        }
                        catch (Exception e)
                        {
                            idx = Convert.ToInt32(s[1]);
                            s[4] = s[0].Split('\n')[0];
                        }
                        english = s[4].Trim('\'').TrimStart('\'');
                    }
                    else
                    {
                        System.Console.WriteLine("++ unprocessed line:" + line);
                    }
                    if (english == "") continue;
                    all_langs al = null;
                    bool b = allLang_map.TryGetValue(idx, out al);
                    if (b == false)

                    {
                        try
                        {
                            System.Console.WriteLine("Cannot find in other langs idx: " + idx + ", " + english + ", more: " + moreEng);
                        }
                        catch (Exception e)
                        {
                            System.Console.WriteLine(e.Message + " " + e.StackTrace);
                        }

                        continue;
                    }
                    if (al.english != "") // already fill english
                    {
                        try
                        {
                            //System.Console.WriteLine("english already field, idx: " + idx + ", " + english + ", more: " + moreEng + ", exists: " + al.english);
                        }
                        catch (Exception e)
                        {
                            System.Console.WriteLine(e.Message + " " + e.StackTrace);
                        }
                    }
                    else
                    {
                        english = english.TrimStart(' ').TrimStart('\'');
                        al.english = english.Replace("\"", "\\\"");
                        al.moreEng = moreEng;
                        allLang_map[idx] = al;
                    }
                }
                foreach (all_langs al in allLang_map.Values)
                {
                    try
                    {
                        if (english == "")
                        {
                            al.english = al.id.ToString();
                        }
                        allLang_map_unique[al.english.ToUpper().Trim(' ')] = al;
                    }
                    catch
                    {
                        int y;
                        y = 0;
                    }
                }
                foreach (all_langs al in allLang_map_unique.Values)
                {
                    try
                    {
                        this.dataGridView1.Rows.Add(al.id.ToString(), al.langs[0], al.langs[1], al.langs[2], al.langs[3], al.english, al.moreEng, al.langs[4], al.langs[5]);
                    }
                    catch (Exception e)
                    {
                        System.Console.WriteLine(e.Message + " " + e.StackTrace);
                    }
                }
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.Message + " " + e.StackTrace);
            }
            file.Close();
            writeLngsFile();
        }
        void getOneLang(string allLang, bool isFirst, int idx)
        {
            //Console.OutputEncoding = System.Text.Encoding.UTF8;
            string[] langLines = allLang.Split('\n');
            for (int i = 0; i < langLines.Length; ++i)
            {
                string[] s = langLines[i].Split('^');

                if (s.Length < 3) continue;
                Int32 id = Convert.ToInt32(s[1]);
                //
                all_langs al = null;
                s[2] = s[2].Replace("\"", "\\\"");
                if (idx == 0)
                {
                    al = new all_langs();
                }
                else
                {
                    
                    bool b = allLang_map.TryGetValue(id, out al);
                    if (b == false)
                    {
                        al = new all_langs();
                        al.langs[idx] = s[2];
                        al.id = id;
                        allLang_map.Add(al.id, al);

                        System.Console.WriteLine("getOneLang() Add sentence not exists in lanngs before," + idx + ", " + langLines[i]);
                        continue;

                    }
                    al.langs[idx] = s[2];
                    allLang_map[id] = al;
                    continue;
                }
                try
                {
                    al.id = id;
                    al.langs[idx] = s[2];
                    if (isFirst)
                    {
                        allLang_map.Add(al.id, al);
                    }
                }
                catch (Exception e)
                {
                    System.Console.WriteLine("getOneLang()," + idx + ", " + e.Message + " " + e.StackTrace);

                }
            }

        }
        //Hebrew	iw
        // russian ru
        //Chinese (PRC)	zh-CN
        // Japanese	ja
        //Italian	it
        //Spanish	es
        void writeLngsFile()
        {
            string[] langs = { "{\n", "{\n", "{\n", "{\n", "{\n" };
            foreach (all_langs al in allLang_map_unique.Values)
            {
                try
                {
                    for (int i = 0; i < 5; ++i)
                    {
                        int l = al.english.Length;
                        if (l > 35) l = 35;

                        if (i == 0)
                        {
                            langs[0] += "\"" + al.english.Substring(0, l) + "\": \"" + al.english + "\",";
                        }
                        else
                        {
                            langs[i] += "\"" + al.english.Substring(0, l) + "\": \"" + al.langs[i - 1] + "\",";
                        }
                    }

                }
                catch (Exception e)
                {
                    System.Console.WriteLine(e.Message + " " + e.StackTrace);
                }
            }
            for (int j = 0; j < 5; ++j)
            {
                int l = langs[j].Length - 1;

                langs[j]  = langs[j].Substring(0, l);
                langs[j] += "}\n";
            }
            //Hebrew	iw
            // russian ru
            //Chinese (PRC)	zh-CN
            // Japanese	ja
            //Italian	it
            //Spanish	es

            File.WriteAllText(path + @"en.json", langs[0], Encoding.UTF8);
            File.WriteAllText(path + @"iw.json", langs[1], Encoding.UTF8);
            File.WriteAllText(path + @"ru.json", langs[2], Encoding.UTF8);
            File.WriteAllText(path + @"zh-CN.json", langs[3], Encoding.UTF8);
            File.WriteAllText(path + @"ja.json", langs[4], Encoding.UTF8);
        }


        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
    class all_langs
    {
        public all_langs() { for (int j = 0; j < 6; ++j) langs[j] = ""; }
        public Int32 id;
        public string[] langs = new string[6];
        public string english = "";
        public string moreEng = "";
    }
}
