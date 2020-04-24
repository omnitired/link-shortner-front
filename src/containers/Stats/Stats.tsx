import React, { useEffect, useState } from 'react';
import StorageService from '../../services/StorageService';
import { Input, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal, Dialog, Tabs, Tab } from '@material-ui/core';
import './style.css'
import ApiService from '../../services/ApiService';
import CopyToClipboard from 'react-copy-to-clipboard';

interface LinkViews {
  short_link: string;
  long_link: string;
  created_at: Date;
  view_count: number;
  devices: any;
  browsers: any;
  id: number;
}

// TODO: add animation
export default function Stats(props: any) {
  useEffect(() => {
    const token = StorageService.getToken();
    if (!token) props.history.push('/signup')
  }, [])

  const [link, setLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState<LinkViews[]>([])
  const [filters, setFilters] = useState({})
  const [selectedRow, setSelectedRow] = useState<LinkViews>();
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeButton, setActiveButton] = useState('all');
  const [singleStats, setSingleStats] = useState<LinkViews>();

  const getShortLink = async () => {
    try {
      const res = await ApiService.getShortLink(link);
      if (res) {
        setShortLink(res.short_link);
      }
    } catch (e) {
      // TODO: handle error
    }
  }

  useEffect(() => {
    ApiService.getLinkStats(filters).then(res => {
      setRows(res)
    })
  }, [shortLink])

  const rowClick = (row: LinkViews) => {
    setSelectedRow(row);
    setSingleStats(row);
    setShowStatsModal(true)
  }

  const onButtonClick = async (value: string) => {
    setActiveButton(value)
    try {
      const res = await ApiService.getSingleLinkStats(selectedRow!.id, {
        time_range: value
      });
      setSingleStats(res);
    } catch (e) {
      // TODO: handle error
    }
  }

  const getButtonVariant = (value: string) => {
    return value === activeButton ? "contained" : "outlined"
  }

  return (
    <div className="stats">
      <h1>
        Yektanet url shortner
      </h1>
      <div>
        <Input placeholder="https://example.com/very_long_url.html" className="url-input" value={link} onChange={(e) => setLink(e.target.value)} />
        <Button onClick={getShortLink} className="submit-button" variant="contained" color="primary">کوتاه کن! </Button>
      </div>

      <div className="shortner">
        {
          shortLink &&
          <React.Fragment>
            <CopyToClipboard text={shortLink} onCopy={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
              <div className="inline">
                <h1 className="shortlink">
                  {shortLink}
                </h1>
                <Button variant="contained" color="primary">copy</Button>
              </div>
            </CopyToClipboard>
            {copied &&
              <p>کپی شد</p>
            }
          </React.Fragment>

        }
      </div>
        هر آی‌پی در هر روز برای هر لینک یک بار شمرده میشود
      <br />
        لینک های پیشین (برای مشاهده ی تعداد کلیک بر اساس تاریخ روی ردیف کلیک کنید)
      <div className="table-wrapper">
        <Paper className="stats-paper">
          <Table className="stats-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ردیف</TableCell>
                <TableCell align="center">لینک</TableCell>
                <TableCell align="center">تاریخ ساخت</TableCell>
                <TableCell align="center">تعداد کلیک</TableCell>
                <TableCell align="center">به تفکیک مرورگر</TableCell>
                <TableCell align="center">به تفکیک پلتفرم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow className="tablerow" onClick={() => rowClick(row)}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{row.short_link}</TableCell>
                  <TableCell align="center">{new Date(row.created_at).toLocaleString('fa')}</TableCell>
                  <TableCell align="center">{row.view_count}</TableCell>
                  <TableCell align="center">{JSON.stringify(row.browsers).replace(/"/g, '')}</TableCell>
                  <TableCell align="center">{JSON.stringify(row.devices).replace(/"/g, '')}</TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </Paper>
        {selectedRow && showStatsModal && <Dialog
          open={showStatsModal}
          onClose={() => setShowStatsModal(false)}
        >
          <div className="stats-view">
            <div className="stats-header">
              <div>
                {selectedRow.short_link}
              </div>
              <div>
                {selectedRow.long_link}
              </div>
            </div>
            <div className="stats-buttons">
              <Button name="all" className="submit-button" color="primary" variant={getButtonVariant("all")} onClick={() => onButtonClick("all")}>همه</Button>
              <Button name="today" className="submit-button" color="primary" variant={getButtonVariant("today")} onClick={() => onButtonClick("today")}>امروز</Button>
              <Button name="yesterday" className="submit-button" color="primary" variant={getButtonVariant("yesterday")} onClick={() => onButtonClick("yesterday")}>دیروز</Button>
              <Button name="seven" className="submit-button" color="primary" variant={getButtonVariant("seven")} onClick={() => onButtonClick("seven")}>هفت روز گذشته</Button>
              <Button name="thirty" className="submit-button" color="primary" variant={getButtonVariant("thirty")} onClick={() => onButtonClick("thirty")}>سی روز گذشته</Button>
            </div>
            {
              singleStats &&
              <div className="singlestats">
                total views: {singleStats.view_count}
                <br/>
                <br/>
                {JSON.stringify(singleStats!.browsers).replace(/"/g, '')}
                <br/>
                <br/>
                {JSON.stringify(singleStats!.devices).replace(/"/g, '')}
              </div>
            }
          </div>
        </Dialog>}
      </div>
    </div>

  )
}
