"use client";

import { useState, useCallback } from "react";
import * as XLSX from "xlsx";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
  console.log("Parsed CSV Headers:", headers);
  
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/^["']|["']$/g, ''));
    return headers.reduce((obj, h, i) => {
      obj[h] = values[i] ?? "";
      return obj;
    }, {});
  });
}

async function parseFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  
  if (extension === 'xlsx' || extension === 'xls') {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    const normalizedData = jsonData.map(row => {
      return Object.keys(row).reduce((acc, key) => {
        acc[key.trim().toLowerCase()] = row[key];
        return acc;
      }, {});
    });
    return normalizedData;
  } else {
    const text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
    return parseCSV(text);
  }
}

function matchRecords(primary, secondary) {
  const targetKey = "transaction id / utr number2";
  
  const getUTR = (row) => {
    const val = row[targetKey] || row["utr"] || "";
    return val.toString().trim();
  };

  const primaryUTRs = new Set(primary.map(r => getUTR(r)).filter(Boolean));
  const secondaryUTRs = new Set(secondary.map(r => getUTR(r)).filter(Boolean));
  
  const onlyInPrimary = primary.filter(r => !secondaryUTRs.has(getUTR(r)));
  const onlyInSecondary = secondary.filter(r => !primaryUTRs.has(getUTR(r)));
  const matchedCount = primary.length - onlyInPrimary.length;

  return { onlyInPrimary, onlyInSecondary, matchedCount };
}

export default function useUpload() {
  const [primaryFile, setPrimaryFile] = useState(null);
  const [secondaryFile, setSecondaryFile] = useState(null);
  const [stats, setStats] = useState({ total: 0, processed: 0, pending: 0 });
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const processFiles = useCallback(async (primary, secondary) => {
    if (!primary || !secondary) return;
    setLoading(true);
    setStats({ total: 0, processed: 0, pending: 0 }); // Reset stats
    
    try {
      const [primaryData, secondaryData] = await Promise.all([
        parseFile(primary),
        parseFile(secondary),
      ]);

      const { onlyInPrimary, onlyInSecondary, matchedCount } = matchRecords(primaryData, secondaryData);
      
      const finalTotal = primaryData.length + onlyInSecondary.length;
      const finalProcessed = matchedCount;
      const finalPending = onlyInPrimary.length + onlyInSecondary.length;

      // Simulated real-time filling
      setStats({ total: finalTotal, processed: 0, pending: finalTotal });
      
      const steps = 20;
      const interval = 50; // ms
      
      for (let i = 1; i <= steps; i++) {
        await new Promise(r => setTimeout(r, interval));
        setStats(prev => ({
          ...prev,
          processed: Math.floor((finalProcessed / steps) * i),
          pending: finalTotal - Math.floor((finalProcessed / steps) * i)
        }));
      }

      // Ensure final values are exact
      setStats({
        total: finalTotal,
        processed: finalProcessed,
        pending: finalPending,
      });

      const getAmount = (r) => {
        return r["transaction amount"] || r["amount"] || r["amt"] || "—";
      };

      const primaryRows = onlyInPrimary.map((r) => ({
        utr: r["transaction id / utr number2"] || r["utr"] || "—",
        date: r["date"] || r["transaction date"] || "—",
        source: "Primary Only",
        amount: getAmount(r),
        ifsc: r["ifsc"] || r["ifsc code"] || "—",
      }));

      const secondaryRows = onlyInSecondary.map((r) => ({
        utr: r["transaction id / utr number2"] || r["utr"] || "—",
        date: r["date"] || r["transaction date"] || "—",
        source: "Secondary Only",
        amount: getAmount(r),
        ifsc: r["ifsc"] || r["ifsc code"] || "—",
      }));

      setTableData([...primaryRows, ...secondaryRows]);
    } catch (err) {
      console.error("File processing error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePrimarySelect = useCallback((file) => setPrimaryFile(file), []);
  const handleSecondarySelect = useCallback((file) => setSecondaryFile(file), []);

  const handleCompare = useCallback(() => {
    if (primaryFile && secondaryFile) {
      processFiles(primaryFile, secondaryFile);
    }
  }, [primaryFile, secondaryFile, processFiles]);

  return {
    primaryFile,
    secondaryFile,
    stats,
    tableData,
    loading,
    handlePrimarySelect,
    handleSecondarySelect,
    handleCompare,
  };
}
